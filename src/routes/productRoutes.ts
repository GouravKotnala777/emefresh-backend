import express from "express";
import { allProducts, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.route("/").get(allProducts);
productRouter.route("/").post(createProduct);
productRouter.route("/:productID").patch(updateProduct);
productRouter.route("/:productID").delete(deleteProduct);

export default productRouter;