import { Router } from "express";
import commentController from '../controllers/commentController.js';
import authLogic from "../middleware/authLogic.js";
import commentLogic from "../middleware/commentLogic.js"
import passport from "passport";

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
});

commentRoutes.post('/create',
    passport.authenticate('jwt', {session: false}),
    (req,res,next)=>{
        req.params.userId=req.user.id;
        next();
    },
    commentController.createComment
);

commentRoutes.post('/update/:userId',
    passport.authenticate('jwt', {session: false}),authLogic.authorize(false),
    commentController.updateComment
);

commentRoutes.delete('/delete/:id',
    commentLogic.findUserByCommentId,
    passport.authenticate('jwt', {session: false}),
    authLogic.authorize(true),
    commentController.deleteComment
);

export default commentRoutes;