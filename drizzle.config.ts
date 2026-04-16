import type { Config } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle",         // Where migrations will be stored
  dialect: "turso",         // CRITICAL: This was missing
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
