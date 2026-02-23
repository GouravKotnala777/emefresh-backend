import express from "express";
import connectDatabase from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 8000;
const DATABASE_URI = process.env.DATABASE_URI;
const allowOrigins = process.env.CLIENT_URL;



connectDatabase(DATABASE_URI);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:allowOrigins?.split(","),
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials:true
}));


app.listen(PORT,() => {
    console.log("Listening...");
});


export default app;