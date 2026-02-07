import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/functions.js";
import jsonwebtoken from "jsonwebtoken";
import { ErrorHandler } from "../utils/classes.js";

export interface AuthRequest extends Request{
    user:{_id:string;};
};

export function isUserAuthenticated(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.cookies.token;
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) return next(new ErrorHandler("JWT_SECRET is undefined", 404));
        
        const verifyToken = jsonwebtoken.verify(token, JWT_SECRET) as {_id:string;};
        
        if (!verifyToken._id) return next(new ErrorHandler("verifyToken._id is undefined", 404));
        
        (req as AuthRequest).user = {_id:verifyToken._id};        
        
        next();            
    } catch (error) {
        console.log(error);
        next(error)
    }
};