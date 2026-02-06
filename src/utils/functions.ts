import { NextFunction, Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";
import mongoose from "mongoose";
import { ErrorHandler } from "./classes.js";


export function sendResponse<JsonDataType>(res:Response, statusCode:number, message:string, jsonData:JsonDataType) {
    res.status(statusCode).json({success:true, message, jsonData});
};

export async function generateToken(userID:mongoose.Schema.Types.ObjectId, next:NextFunction) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) return new ErrorHandler("JWT_SECRET is undefined", 404);

        const token = await jsonWebToken.sign({_id:userID}, JWT_SECRET);

        if (!token) return new ErrorHandler("token is undefined", 404);

        return token;
    } catch (error) {
        next(error);
    }
};
