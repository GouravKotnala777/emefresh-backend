import express from "express";
import { createOrder, myOrders, updateOrder } from "../controllers/orderController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.route("/").get(isUserAuthenticated, myOrders);
orderRouter.route("/").post(isUserAuthenticated, createOrder);
orderRouter.route("/").patch(isUserAuthenticated, updateOrder);

export default orderRouter;