import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import commentValidator from '../validator/commentValidator.js';

const prisma = new PrismaClient();
//-------CREATE--------
const createComment=[
    commentValidator.createValidator,
    async function (req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
        try {
        const newComment = await prisma.comment.create({
            data:{
                content: req.body.content,
                userId: Number(req.body.userId),
                blogId: Number(req.body.blogId),
            }
        });
        res.status(200).json({
            message: 'Comment successfully created',
            comment: newComment
        });
        } catch (error) {
           console.log(error);
           res.status(500).json({
            error: 'Internal server error',
           }); 
        }
    }
]
//-------READ----------

async function getCommentsByBlog(req, res) {
    const blogId = Number(req.query.blogId);
    const blog = await prisma.blog.findUnique({
        where:{
            id: blogId
        }
    });
    if(!blog){
        return res.status(404).json({
            error: 'Blog not found'
        });
    }
    const comments = await prisma.comment.findMany({
        where:{
            blogId: blogId
        }
    });
    return res.status(200).json({
        comments: comments
    });
}

async function getCommentsByUser(req, res) {
    try{
    const userId = Number(req.query.userId);
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    });
    if(!user){
        return res.status(404).json({
            error: 'User not found'
        });
    }
    const comments = await prisma.comment.findMany({
        where:{
            userId: userId
        }
    });
    return res.status(200).json({
        comments: comments
    });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:'Internal server error'
        });
    }
}

async function getCommentById(req, res){
    try {
        const id = Number(req.query.id);
        const comment = await prisma.comment.findUnique({
        where:{
            id: id
        }
        });
        return res.status(200).json({
            comment
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }   
}

//-------UPDATE--------
const updateComment=[
    commentValidator.updateValidator,
    async function(req, res){
        try {
            const id = Number(req.params.id);
        const comment = await prisma.comment.findUnique({
            where: {
                id: id
            }
        });
        if(!comment){
            return res.status(404).json({
                error: 'comment not found'
            });
        }
        const newComment = {};
        if(req.body.content){
            newComment.content = req.body.content;
        }

        if(Object.keys(newComment).length===0){
            return res.status(400).json({
                error: 'Nothing to update'
            });
        }
        const updatedRes = await prisma.comment.update({
            where: {
                id: id
            },
            data:newComment
        });
        res.status(200).json({
            message:'updated successfully',
            comment: updatedRes
        });
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal server error');
        }
    }
];
//-------DELETE--------
async function deleteComment(req, res){

    const id = Number(req.params.id);
    const comment = prisma.comment.findUnique({
        where: {
            id: id
        }
    });
    if(!comment){
        return res.status(404).json({
            error: 'comment not found'
        });
    }
    try{
        await prisma.comment.delete({
            where:{
                id: id
            }
        });
        res.status(204).end();
    }
    catch(err){
        console.log(err);
        res.status(500).json('Internal server error');
    }

}


const commentController = {
    createComment,
    getCommentById,
    getCommentsByBlog,
    getCommentsByUser,
    updateComment,
    deleteComment,
};
export default commentController;