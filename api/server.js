const express = require("express");
const crypto = require("crypto");
const { randomUUID } = require("crypto");
const cors = require("cors");
const pinoHttp = require("pino-http");
const client = require("prom-client");
const CircuitBreaker = require("opossum");

const config = require("./config");
const logger = require("./logger");

const app = express();
const PORT = config.PORT;

app.use(express.json());

app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);

// -----------------------------
// Request ID Middleware
// -----------------------------
app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  next();
});

// -----------------------------
// HTTP Logger
// -----------------------------
app.use(
  pinoHttp({
    logger,
    genReqId: (req) => req.id,
    customProps: (req) => ({
      request_id: req.id,
    }),
  })
);

// -----------------------------
// Prometheus Metrics
// -----------------------------
client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status"],
});

const activeRequests = new client.Gauge({
  name: "active_requests",
  help: "Current active requests",
});

// Metrics middleware
app.use((req, res, next) => {
  activeRequests.inc();

  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    activeRequests.dec();

    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    });

    end({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    });
  });

  next();
});

// -----------------------------
// Metrics Endpoint
// -----------------------------
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// -----------------------------
// In-memory Storage
// -----------------------------
const links = [];

// -----------------------------
// Simulated External Dependency
// -----------------------------
async function simulatedStorage(link) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      const err = new Error("Dependency timeout");
      err.code = "ETIMEDOUT";
      reject(err);
    }, 1000)
  );

  const operationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        const err = new Error("Storage unavailable");
        err.code = "ECONNRESET";
        return reject(err);
      }

      links.push(link);
      resolve(link);
    }, 100);
  });

  return Promise.race([operationPromise, timeoutPromise]);
}

// -----------------------------
// Retry with Exponential Backoff
// -----------------------------
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 100,
    maxDelay = 2000,
    jitter = 50,
    retryableErrors = [
      "ECONNRESET",
      "ETIMEDOUT",
      "ECONNREFUSED",
    ],
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (!retryableErrors.includes(error.code)) {
        throw error;
      }

      if (attempt === maxRetries) break;

      const exponentialDelay = Math.min(
        baseDelay * Math.pow(2, attempt),
        maxDelay
      );

      const jitterOffset =
        Math.floor(Math.random() * jitter * 2) - jitter;

      const delay = Math.max(
        0,
        exponentialDelay + jitterOffset
      );

      logger.warn({
        event: "retry_attempt",
        attempt: attempt + 1,
        delay_ms: delay,
        error: error.message,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw lastError;
}

// -----------------------------
// Circuit Breaker
// -----------------------------
const breaker = new CircuitBreaker(simulatedStorage, {
  timeout: 1000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  volumeThreshold: 5,
});

breaker.fallback((link) => {
  logger.warn({
    event: "circuit_open_fallback",
  });

  return {
    ...link,
    degraded: true,
    source: "fallback",
  };
});

breaker.on("open", () =>
  logger.error({
    event: "circuit_opened",
  })
);

breaker.on("halfOpen", () =>
  logger.info({
    event: "circuit_half_open",
  })
);

breaker.on("close", () =>
  logger.info({
    event: "circuit_closed",
  })
);

// -----------------------------
// URL Validation
// -----------------------------
function isValidUrl(input) {
  if (typeof input !== "string") return false;

  const url = input.trim();

  if (url !== input) return false;

  if (/[\r\n\t]/.test(url)) return false;

  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// -----------------------------
// Health Endpoints
// -----------------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/live", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// -----------------------------
// Create Link
// -----------------------------
app.post("/links", async (req, res) => {
  const { long_url, expires_at, tags } = req.body;

  if (!isValidUrl(long_url)) {
    logger.warn({
      request_id: req.id,
      message: "Invalid URL submitted",
    });

    return res.status(400).json({
      error: "Only valid http/https URLs are allowed.",
    });
  }

  if (expires_at) {
    const expiry = new Date(expires_at);

    if (isNaN(expiry.getTime()) || expiry <= new Date()) {
      return res.status(400).json({
        error: "expires_at must be a future date.",
      });
    }
  }

  if (tags && (!Array.isArray(tags) || tags.length > 10)) {
    return res.status(400).json({
      error: "Maximum 10 tags allowed.",
    });
  }

  const code = crypto.randomBytes(3).toString("hex");

  const link = {
    id: links.length + 1,
    code,
    long_url,
    expires_at: expires_at || null,
    tags: tags || [],
    created_at: new Date().toISOString(),
    short_url: `http://localhost:${PORT}/r/${code}`,
  };

  try {
    const result = await retryWithBackoff(() =>
      breaker.fire(link)
    );

    logger.info({
      request_id: req.id,
      message: "Short link created",
      code,
    });

    return res.status(201).json(result);
  } catch (err) {
    logger.error({
      event: "dependency_failure",
      dependency: "storage",
      error: err.message,
    });

    return res.status(503).json({
      error: "Storage temporarily unavailable",
    });
  }
});

// -----------------------------
// Get All Links
// -----------------------------
app.get("/links", (req, res) => {
  res.json(links);
});

// -----------------------------
// Get Link By ID
// -----------------------------
app.get("/links/:id", (req, res) => {
  const id = Number(req.params.id);

  const link = links.find((l) => l.id === id);

  if (!link) {
    logger.error({
      request_id: req.id,
      message: "Link not found",
    });

    return res.status(404).json({
      error: "Link not found",
    });
  }

  res.json(link);
});

// -----------------------------
// Redirect
// -----------------------------
app.get("/r/:code", (req, res) => {
  const link = links.find((l) => l.code === req.params.code);

  if (!link) {
    return res.status(404).json({
      error: "Invalid short code",
    });
  }

  if (link.expires_at && new Date(link.expires_at) <= new Date()) {
    return res.status(410).json({
      error: "Link expired",
    });
  }

  return res.redirect(302, link.long_url);
});

// -----------------------------
// Startup
// -----------------------------
app.listen(PORT, () => {
  logger.info({
    message: "Service starting",
    environment: config.NODE_ENV,
    port: PORT,
    log_level: config.LOG_LEVEL,
  });

  logger.info(`Server running on port ${PORT}`);
});