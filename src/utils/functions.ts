import { NextFunction, Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";
import mongoose from "mongoose";
import { ErrorHandler } from "./classes.js";
import bcrypt from "bcryptjs";


export function sendResponse<JsonDataType>(res:Response, statusCode:number, message:string, jsonData:JsonDataType) {
    return res.status(statusCode).json({success:true, message, jsonData});
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

function validateFields(next:NextFunction, fields:Record<string, string|number|boolean>) {
    console.log("////////////////////////1");
    const fieldNames = Object.keys(fields);
    for (const fieldName of fieldNames) {
        if (fields[fieldName] === undefined || fields[fieldName] === null || fields[fieldName] === "") {
            return next(new ErrorHandler(`all fields are required (${fieldName} ---> ${fields[fieldName]})`, 400));
        }
    }

    console.log("////////////////////////2");
};

export async function isPasswordMatched(originalPassword:string, hashedPassword:string) {
    try {
        const isMatched = await bcrypt.compare(originalPassword, hashedPassword);
        return isMatched;        
    } catch (error) {
        console.log(error);
        return false;
    }
};