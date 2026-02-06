import { NextFunction, Request, Response } from "express";
import Users, { UserTypesBody } from "../models/userModel.js";
import { isPasswordMatched, sendResponse } from "../utils/functions.js";
import { ErrorHandler } from "../utils/classes.js";


export async function register(req:Request<{}, {}, UserTypesBody, {}>, res:Response, next:NextFunction) {
    try {
        const {name, email, password} = req.body;

        if (name || email || password) return next(new ErrorHandler(`all fields are required ${JSON.stringify({name, email, password})}`, 400));
        
        const existingUser = await Users.findOne({email});        

        if (existingUser) return next(new ErrorHandler("user already exist", 401));

        const newUser = await Users.create({
            name, email, password
        });

        if (!newUser) return next(new ErrorHandler("internal server error", 500));

        sendResponse(res, 201, "", newUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export async function login(req:Request<{}, {}, UserTypesBody, {}>, res:Response, next:NextFunction) {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) return next(new ErrorHandler(`all fields are required ${JSON.stringify({email, password})}`, 400));        

        const existingUser = await Users.findOne({email});

        if (!existingUser) return next(new ErrorHandler("user not found 1", 404));

        const isMatched = await isPasswordMatched(password, existingUser.password);

        if (!isMatched) return next(new ErrorHandler("user not found 2", 404));

        sendResponse(res, 201, "", existingUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export async function getAllUsers(req:Request<{}, {}, UserTypesBody, {}>, res:Response, next:NextFunction) {
    try {
        const allUsers = await Users.find();
        sendResponse(res, 200, "", allUsers);
    } catch (error) {
        console.log(error);
        next(error);
    }
};