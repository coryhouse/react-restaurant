import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import webhookRouter from "./routes/webhook.js";
import ordersRouter from "./routes/orders.js";
import checkoutRouter from "./routes/checkout.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// CRITICAL: Webhook route MUST come before express.json()
// Stripe requires raw body for signature verification
app.use("/api/webhook", webhookRouter);

// Body parser middleware (for non-webhook routes)
app.use(express.json());

// Routes
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", ordersRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});
