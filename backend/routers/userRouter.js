import express from "express";
// controller functions 
import { signup, login } from "../controllers/userControllers.js";

const userRouter = express.Router();

// login user
userRouter.post('/login', login);

// signup user
userRouter.post('/signup', signup);

export default userRouter;