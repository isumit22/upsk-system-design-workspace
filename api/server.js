const express = require("express");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const links = [];

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

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.get("/live", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});
app.post("/links", (req, res) => {
  const { long_url, expires_at, tags } = req.body;

  if (!isValidUrl(long_url)) {
    return res.status(400).json({
      error: "Only valid http/https URLs are allowed."
    });
  }

  if (expires_at) {
    const expiry = new Date(expires_at);

    if (isNaN(expiry.getTime()) || expiry <= new Date()) {
      return res.status(400).json({
        error: "expires_at must be a future date."
      });
    }
  }

  if (tags && (!Array.isArray(tags) || tags.length > 10)) {
    return res.status(400).json({
      error: "Maximum 10 tags allowed."
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
    short_url: `http://localhost:${PORT}/r/${code}`
  };

  links.push(link);

  res.status(201).json(link);
});

app.get("/links", (req, res) => {
  res.json(links);
});

app.get("/links/:id", (req, res) => {
  const id = Number(req.params.id);

  const link = links.find(l => l.id === id);

  if (!link) {
    return res.status(404).json({
      error: "Link not found"
    });
  }

  res.json(link);
});

app.get("/r/:code", (req, res) => {
  const link = links.find(l => l.code === req.params.code);

  if (!link) {
    return res.status(404).json({
      error: "Invalid short code"
    });
  }

  if (link.expires_at && new Date(link.expires_at) <= new Date()) {
    return res.status(410).json({
      error: "Link expired"
    });
  }

  return res.redirect(302, link.long_url);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});