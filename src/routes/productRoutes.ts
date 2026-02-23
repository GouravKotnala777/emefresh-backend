import express from "express";
import { allProducts, createProduct, deleteProduct, updateProduct, uploadProductImage, uploadProductPreviewImages } from "../controllers/productController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";
import {upload} from "../middlewares/upload.js";


const productRouter = express.Router();

productRouter.route("/all").get(allProducts);
productRouter.route("/create").post(isUserAuthenticated, createProduct);
productRouter.route("/upload_image").post(upload.single("image"), uploadProductImage);
productRouter.route("/upload_images").post(upload.array("images", 3), uploadProductPreviewImages);
productRouter.route("/update/:productID").patch(updateProduct);
productRouter.route("/delete/:productID").delete(deleteProduct);

export default productRouter;