import { Router } from "express";
import postController from '../controllers/postController.js';
import passport from 'passport';
import authLogic from "../middleware/authLogic.js";
import postLogic from "../middleware/postLogic.js";
import misc from "../middleware/misc.js";

const postRoutes = Router();
postRoutes.post('/create',
    passport.authenticate('jwt',{session:false}),
    misc.assignUserId,
    postController.createPost);

postRoutes.get('/read',postController.getAllBlogs);
postRoutes.get('/read/published', postController.getPublishedBlogs);
postRoutes.get('/read/:id',postController.getBlogsById);

postRoutes.post('/update/:id',
    passport.authenticate('jwt',{session:false}),
    postLogic.findUserByPostId,
    authLogic.authorize(false),
    postController.updateBlogPost
);

postRoutes.delete('/delete/:id',
    passport.authenticate('jwt',{session:false}),
    postLogic.findUserByPostId,
    authLogic.authorize(true),
    postController.deleteBlog
);

export default postRoutes;