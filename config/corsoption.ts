import { CorsOptions } from "cors";

/**
 * Public CORS policy — relaxed, for open endpoints
 */
export const publicCorsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET"],
};

/**
 * Authenticated CORS policy — strict, for private endpoints
 */
export const authenticatedCorsOptions: CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
