import express from "express";
import { getAllUsers, login, register } from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";


const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/all_users").get(isUserAuthenticated, getAllUsers);


export default userRouter;