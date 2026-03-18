import { NextFunction, Request, Response } from "express";
import Product, { CreateProductBodyTypes, UpdateProductBodyTypes } from "../models/productModel.js";
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
export async function getSingleProduct(req:Request, res:Response, next:NextFunction) {
    try {
        const {productID} = req.params;
        console.log(productID);
        
        const singleProduct = await Product.findById(productID);

        if (!singleProduct) return new ErrorHandler("singleProduct not found", 404);
        //if (!singleProduct) return next(new ErrorHandler("singleProduct not found", 404));

        sendResponse(res, 200, "", singleProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export async function createProduct(req:Request<{}, {}, CreateProductBodyTypes, {}>, res:Response, next:NextFunction) {
    try {
        const {name, price, description, category, weight, volume, tag} = req.body;
              
        if (!name || !price || !description || !category || !tag) return next(new ErrorHandler("all fields are required", 400));

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
export async function uploadProductImage(req:Request, res:Response, next:NextFunction) {
    try {
        const {productID} = req.body
        const file = req.file;

        if (!productID) return new ErrorHandler("productID is undefined", 404);
        if (!file || !file.filename) return new ErrorHandler("image not found", 404);

        const imagePath = `/public/${file.filename}`;

        await Product.findByIdAndUpdate(productID, {
            image:imagePath
        });

        sendResponse(res, 200, "image uploaded", {imagePath});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export async function uploadProductPreviewImages(req:Request, res:Response, next:NextFunction) {
    try {
        const {productID} = req.body
        const files = req.files;

        if (!productID) return new ErrorHandler("productID is undefined", 404);
        if (!files || files.length === 0) return new ErrorHandler("preview images not found", 404);
        
        const previewImagesPath = (files as Express.Multer.File[]).map((file) => `/public/${file.filename}`);
        
        if (previewImagesPath.length === 0) return new ErrorHandler("previewImagesPath not found", 404);


        await Product.findByIdAndUpdate(productID, {
            previewImages:previewImagesPath
        });

        sendResponse(res, 200, "preview images uploaded", {previewImagesPath});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export async function updateProduct(req:Request<{productID:string;}, {}, UpdateProductBodyTypes, {}>, res:Response, next:NextFunction) {
    try {
        const {productID} = req.params;
        const {name, price, description, category, weight, volume, stock, warning, tag} = req.body;

        if (!productID) return next(new ErrorHandler("productID not found", 404));
        if (!name && !price && !description && !category && !weight && !volume && !stock && !warning && !tag) return next(new ErrorHandler("atleast one field is required", 400));

        const bodyToUpdate = {
            ...(name&&{name}),
            ...(price&&{price}),
            ...(description&&{description}),
            ...(category&&{category}),
            ...(weight&&{weight}),
            ...(volume&&{volume}),
            ...(stock&&{stock}),
            ...(warning&&{warning:warning.split(",")}),
            ...(tag&&{tag:tag.split(",")}),
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