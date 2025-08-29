import dotenv from "dotenv";
import { z, ZodError } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().transform(Number).default(8000),

  //JWT Configuration
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "Access Secret must be atleast 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "Refresh Secret must be atleast 32 characters"),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),

  //CORS
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
});

const parseEnv = () => {
  const parsedEnv = envSchema.safeParse(process.env);
  if (!parsedEnv.success) {
    console.log("parsed env errors", parsedEnv.error);
    process.exit(1);
  }
  return parsedEnv.data;
};

const env = parseEnv();

export const config = {
  app: {
    env: env.NODE_ENV,
    port: env.PORT,
    isDevelopment: env.NODE_ENV === "development",
    isProduction: env.NODE_ENV === "production",
  },
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiry: env.JWT_ACCESS_EXPIRY,
    refreshExpiry: env.JWT_REFRESH_EXPIRY,
  },
};
