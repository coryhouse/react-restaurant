import express from "express";
import { getOrderById } from "../services/order.service.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
