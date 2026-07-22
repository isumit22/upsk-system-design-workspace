const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().positive(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url(),
  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("\n❌ Invalid environment configuration\n");
  console.error(parsed.error.format());
  process.exit(1);
}

module.exports = parsed.data;