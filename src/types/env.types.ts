import { z } from "zod";

// Define the schema for your environment variables
const envSchema = z.object({
  VITE_API_URL: z.url(),
});

// Parse and validate environment variables
export const env = envSchema.parse(import.meta.env);

// Export the type for TypeScript
export type Env = z.infer<typeof envSchema>;
