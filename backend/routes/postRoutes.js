import { Router } from "express";
import postController from '../controllers/postController.js';
import passport from 'passport';
import authLogic from "../middleware/authLogic.js";

const postRoutes = Router();
postRoutes.post('/create', postController.createPost);

postRoutes.get('/read',postController.getAllBlogs);

postRoutes.get('/read/author/:authorId',postController.getBlogsByAuthorId);
postRoutes.get('/read/post/:id',postController.getBlogsById);
postRoutes.post('/update/:id',postController.updateBlogPost);
postRoutes.delete('/delete/:id',postController.deleteBlog);

export default postRoutes;