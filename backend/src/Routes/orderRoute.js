import express from 'express';
import { createOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../Controller/orderController.js";
import authMiddleware from "../Middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", authMiddleware, createOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
