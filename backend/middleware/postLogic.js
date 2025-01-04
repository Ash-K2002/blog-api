import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const findUserByPostId= async(req, res,next)=>{
    const id = Number(req.params.id);
    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        },
        select:{
            authorId:true,
        }
    });
    req.params.userId=blog.authorId;
    next();
}

export default{
    findUserByPostId,
}