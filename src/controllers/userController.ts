import { NextFunction, Request, Response } from "express";
import userModel, { UserTypesBody } from "../models/userModel.js";
import { sendResponse } from "../utils/functions.js";
import { ErrorHandler } from "../utils/classes.js";


export async function register(req:Request<{}, {}, UserTypesBody, {}>, res:Response, next:NextFunction) {
    try {
        const {name, email, password} = req.body;

        const existingUser = await userModel.findOne({email});

        console.log(existingUser);
        

        if (existingUser) return next(new ErrorHandler("user already exist", 401));

        const newUser = await userModel.create({
            name, email, password
        });

        if (!newUser) next(new ErrorHandler("internal server error", 500));

        res.status(200).json({success:true, message:"", jsonBody:newUser});
    } catch (error) {
        console.log(error);
        next(error);
    }
};
