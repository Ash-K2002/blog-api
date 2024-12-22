import { Router } from "express";
import commentController from '../controllers/commentController.js';

const commentRoutes= Router();

commentRoutes.get('/read',async (req, res)=>{
    const {id, blogId, userId} = req.query;

    if(blogId){
        return commentController.getCommentsByBlog(req, res);
    }
    else if(userId){
        return commentController.getCommentsByUser(req, res);
    }
    else if(id){
        return commentController.getCommentById(req, res);
    }
    else{
        return res.status(400).json({
            error: 'Invalid request, no Id specified'
        });
    }
})
commentRoutes.post('/create',commentController.createComment);
commentRoutes.post('/update/:id',commentController.updateComment);
commentRoutes.delete('/delete/:id',commentController.deleteComment);

export default commentRoutes;