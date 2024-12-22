import { PrismaClient } from "@prisma/client";
import postValidator from '../validator/postValidator.js';
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

//------CREATE----------
const createPost=[
postValidator.createValidator,

async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try{
        const newPost = await prisma.blog.create({
            data:{
                title: req.body.title,
                content: req.body.content,
                authorId: Number(req.body.authorId),
                published: Boolean(req.body.published)
            }
        });
        return res.status(201).json({
            newPost
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}
    
];

//------READ------------

async function getAllBlogs(req, res){
    try{
        const blogs = await prisma.blog.findMany();
        res.status(200).json({
            blogs
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal server error"});
    }
}

async function getBlogsByAuthorId(req, res){
    try{
        const {authorId}=req.params;
        const blogs = await prisma.blog.findMany({
            where:{
                authorId: Number(authorId)
            }
        });
        res.status(200).json({
            blogs
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

async function getBlogsById(req, res){
    try{
        const {id}=req.params;
        const blog = await prisma.blog.findUnique({
            where:{
                id: Number(id),
            }
        });
        res.status(200).json({
            blog
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

//------UPDATE-----------
const updateBlogPost =[
    postValidator.updateValidator,
    async function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
    
        try{
            const id = req.params.id;
            const oldPost = await prisma.blog.findUnique({
                where: {
                    id: id
                }
            });
            if(!oldPost){
                res.status(404).json({
                    error: 'blog post not found'
                });
            }
            const updatedPost = {};
            if(req.body.title){
                updatedPost.title = req.body.title;
            }
            if(req.body.content){
                updatedPost.ontent = req.body.content;
            }
            if(req.body.published){
                updatedPost.published = req.body.content;
            }

            if(oldPost.published===false && updatedPost.published==true){
                updatedPost.publishedAt = Date.now();
            }

            if(Object.keys(updatedPost).length===0){
                return res.status(400).json({
                    error: 'No valid fields to update'
                });
            }

            const updatedRes = await prisma.blog.update({
                where:{
                    id: id
                },
                data: updatedPost
            });
            res.status(200).json({
                message: 'Blog updated',
                id: id,
                post: updatedRes
            });

        }catch(error){
            console.log(error);
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }
];
//------DELETE-----------

async function deleteBlog(req, res){
    try{
        const id = Number(req.params.id);
        const blog = await prisma.blog.findUnique({
            where: {id: id}
        });
        if(!blog){
            return res.status(404).json({
                error: "blog post not found"
            });
        }
        await prisma.blog.delete({
            where: {id: id}
        });
        res.status(204).end();
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}
const postController ={
    createPost,
    getAllBlogs,
    getBlogsByAuthorId,
    getBlogsById,
    updateBlogPost,
    deleteBlog,
}

export default postController;