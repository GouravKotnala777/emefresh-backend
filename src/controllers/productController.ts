import { NextFunction, Request, Response } from "express";
import Product, { CreateProductBodyTypes } from "../models/productModel.js";
import { ErrorHandler } from "../utils/classes.js";
import { sendResponse } from "../utils/functions.js";


export async function allProducts(req:Request, res:Response, next:NextFunction) {
    try {
        const allProducts = await Product.find();

        sendResponse(res, 200, "", allProducts);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export async function createProduct(req:Request<{}, {}, CreateProductBodyTypes, {}>, res:Response, next:NextFunction) {
    try {
        const {name, price, description, category, weight, volume, tag} = req.body;

        if (!name || !price || !description || !category || !weight || !volume || !tag) return next(new ErrorHandler("all fields are required", 400));

        const existingProduct = await Product.findOne({name});

        if (existingProduct) return next(new ErrorHandler("product already exist", 401));
        
        const newProduct = await Product.create({
            name, price, description, category, weight, volume, tag
        });
        
        if (!newProduct) return next(new ErrorHandler("internal server error", 500));

        sendResponse(res, 200, "Product Created", newProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export async function updateProduct(req:Request<{productID:string;}, {}, CreateProductBodyTypes, {}>, res:Response, next:NextFunction) {
    try {
        const {productID} = req.params;
        const {name, price, description, category, weight, volume, tag} = req.body;

        if (!productID) return next(new ErrorHandler("productID not found", 404));
        if (!name && !price && !description && !category && !weight && !volume && !tag) return next(new ErrorHandler("atleast one field is required", 400));

        const bodyToUpdate = {
            ...(name&&{name}),
            ...(price&&{price}),
            ...(description&&{description}),
            ...(category&&{category}),
            ...(weight&&{weight}),
            ...(volume&&{volume}),
            ...(tag&&{tag})
        };

        const updatedProduct = await Product.findByIdAndUpdate(productID, bodyToUpdate, {new:true});
        
        if (!updatedProduct) return next(new ErrorHandler("internal server error", 500));

        sendResponse(res, 200, "Product Updated", updatedProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export async function deleteProduct(req:Request<{productID:string;}, {}, CreateProductBodyTypes, {}>, res:Response, next:NextFunction) {
    try {
        const {productID} = req.params;

        if (!productID) return next(new ErrorHandler("productID not found", 404));
        
        const deletedProduct = await Product.findByIdAndDelete(productID);
        
        if (!deletedProduct) return next(new ErrorHandler("internal server error", 500));
        
        sendResponse(res, 200, "Product deleted", deletedProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
};