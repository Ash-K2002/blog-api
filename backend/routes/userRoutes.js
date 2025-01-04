import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "passport";
import authLogic from '../middleware/authLogic.js'
const userRoutes = Router();

userRoutes.get('/read',userController.findAllUsers);
userRoutes.get('/read/:userId',userController.findUser);
userRoutes.get('/enum-roles',userController.getRoles);
userRoutes.post('/create',userController.createUserPost);

userRoutes.post('/update/:userId',
    passport.authenticate('jwt',{
        session:false
    }),
    authLogic.authorize(false),
    userController.updateUserPost
);

userRoutes.delete('/delete/:userId',
    passport.authenticate('jwt',{session:false}),
    authLogic.authorize(true),
    userController.deleteUser);

export default userRoutes;