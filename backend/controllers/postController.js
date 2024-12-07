import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPost(req, res){
    try{
        const {title, content, authorId} =req.body;
        const newPost = await prisma.blog.create({
            data:{
                title,
                content,
                authorId,
            },
        });
        console.log(newPost);
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(500).json({
            error: error
        });
    }
};

async function getPost(req, res){
    try{
        
    }
    catch(err){

    }
    res.status(201).json({
        "hello":"world"
    });
}

const postController ={
    createPost,
    getPost,
}

export default postController;