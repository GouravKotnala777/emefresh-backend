import express from "express";
import { getAllUsers, login, myProfile, register } from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";


const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/all_users").get(isUserAuthenticated, getAllUsers);
userRouter.route("/my_profile").get(isUserAuthenticated, myProfile);


export default userRouter;