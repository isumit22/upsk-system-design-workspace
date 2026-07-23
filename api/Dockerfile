# ---------- Builder ----------
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# ---------- Runtime ----------
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/config.js ./config.js
COPY --from=builder /app/logger.js ./logger.js
COPY --from=builder /app/prisma ./prisma

RUN groupadd -r appgroup && \
    useradd -r -g appgroup -s /usr/sbin/nologin appuser

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]