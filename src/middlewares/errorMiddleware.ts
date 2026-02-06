import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/classes.js";



function errorMiddleware(err:ErrorHandler, _:Request, res:Response, __:NextFunction) {
    let message = err.message;
    let statusCode = err.statusCode;

    if (err.name === "CastError") {
        message = "Wrong ObjectId Format";
        statusCode = 400;
    }
    if (err.name === "ValidationError") {
        statusCode = 400;
    }
    return res.status(statusCode).json({success:false, message, jsonData:{}});
};

export default errorMiddleware;