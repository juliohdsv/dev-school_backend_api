import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_PORT: z.coerce.number(),
  NODE_ENV: z.string(), 
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("⚠️ Environment variables error:");
  throw new Error("Make sure have environment variables");
}

export const env = _env.data;