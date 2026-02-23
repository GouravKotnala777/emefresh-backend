import app from "./app.js";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/api/v1/public", express.static(path.join(__dirname, "../public")));

app.route("/").get((req, res) => {
    res.status(200).json({success:true, message:`server is running...`});
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.use(errorMiddleware);