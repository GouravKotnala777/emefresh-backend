import { NextFunction, Request, Response } from "express";
import Order, { CreateOrderFormTypes, UpdateOrderFormTypes } from "../models/orderModel.js";
import { ErrorHandler } from "../utils/classes.js";
import { sendResponse } from "../utils/functions.js";
import { AuthRequest } from "../middlewares/auth.js";
import mongoose, { Schema, Types } from "mongoose";


export async function myOrders(req:Request, res:Response,next:NextFunction) {
    try {
        const userID = (req as AuthRequest).user._id;
        
        if (!userID) return next(new ErrorHandler("userID is undefined", 404));

        const myOrders = await Order.find({
            userID:new mongoose.Schema.Types.ObjectId(userID)
        });

        sendResponse(res, 201, "", myOrders);
    } catch (error) {
        next(error);
    }
};

export async function createOrder(req:Request<{}, {}, CreateOrderFormTypes>, res:Response,next:NextFunction) {
    try {
        const {products, totalAmount, modeOfPayment, orderStatus, paymentStatus, location} = req.body;
        const userID = (req as AuthRequest).user._id;

        if (!userID || !totalAmount || !modeOfPayment || !orderStatus || !paymentStatus || !location) return next(new ErrorHandler("all fields are required", 400));
        if (!products || products.length === 0) return next(new ErrorHandler("products are undefined", 404));

        const newOrder = await Order.create({
            userID, products, totalAmount, modeOfPayment, orderStatus, paymentStatus, location
        });

        if (!newOrder) return next(new ErrorHandler("internal server error", 500));

        sendResponse(res, 201, "order placed successfully", {});
    } catch (error) {
        next(error);
    }
};

export async function updateOrder(req:Request<{}, {}, UpdateOrderFormTypes>, res:Response,next:NextFunction) {
    try {
        const {orderID, orderStatus, paymentStatus} = req.body;

        if ((!orderID) || (!orderStatus && !paymentStatus)) return next(new ErrorHandler("all fields are required", 400));

        const updateOrder = await Order.findByIdAndUpdate(orderID, {
            orderStatus, paymentStatus
        }, {new:true});

        if (!updateOrder) return next(new ErrorHandler("internal server error", 500));

        sendResponse(res, 201, "order status updated", {orderStatus, paymentStatus});
    } catch (error) {
        next(error);
    }
};

