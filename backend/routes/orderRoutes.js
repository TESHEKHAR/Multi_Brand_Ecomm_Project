import express from "express";
import { getAllOrders, placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", placeOrder);
router.get('/orders', getAllOrders);

export default router;
