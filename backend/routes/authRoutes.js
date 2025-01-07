import { Router } from "express";
import authController from "../controllers/authController.js";

const authRoute = Router();

authRoute.post('/login',authController.loginController);
authRoute.get('/check-auth',authController.checkAuth);

export default authRoute;