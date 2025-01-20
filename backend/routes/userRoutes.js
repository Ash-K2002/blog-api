import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "passport";
import authLogic from '../middleware/authLogic.js'
import misc from '../middleware/misc.js'
const userRoutes = Router();

userRoutes.get('/read',userController.findAllUsers);

userRoutes.get('/read/:userId',userController.findUser);

userRoutes.get('/enum-roles',userController.getRoles);

userRoutes.get('/published-blogs',
    passport.authenticate('jwt',{
        session:false,
    }),
    misc.assignUserId,
    authLogic.authorize(false),
     userController.getPublishedBlogs);

userRoutes.get('/unpublished-blogs',
    passport.authenticate('jwt',{
        session:false,
    }),
    misc.assignUserId,
    authLogic.authorize(false),
     userController.getUnpublishedBlogs);

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