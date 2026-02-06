import app from "../app.js";
import express from "express";
import { getAllUsers, login, register } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/all_users").get(getAllUsers);


export default userRouter;