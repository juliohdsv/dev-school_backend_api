import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number(),
  ENV: z.string(), 
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("⚠️ Environment variables error:");
  throw new Error("Make sure have environment variables");
}

export const env = _env.data;