import { Router } from "express";
import userController from "../controllers/userController.js";
import authWare from '../middleware/authLogic.js';
const userRoutes = Router();

userRoutes.get('/read',userController.findAllUsers);
userRoutes.get('/read/:id',authWare.authenticate,userController.findUser);
userRoutes.get('/enum-roles',userController.getRoles);
userRoutes.post('/create',userController.createUserPost);
userRoutes.post('/update/:id',userController.updateUserPost);
userRoutes.delete('/delete/:id', userController.deleteUser);

export default userRoutes;