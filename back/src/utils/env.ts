import dotenv from "dotenv";

const requiredEnvVars = ["PORT", "OPEN_UV_KEY"];

export function loadEnv() {
  const result = dotenv.config();

  if (result.error) {
    throw new Error(`Failed to load .env file: ${result.error.message}`);
  }

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}
