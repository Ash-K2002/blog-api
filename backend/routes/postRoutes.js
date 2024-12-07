import { Router } from "express";
import postController from '../controllers/postController.js';

const postRoutes = Router();
postRoutes.post('/create', postController.createPost);
postRoutes.get('/read', postController.getPost);

export default postRoutes;