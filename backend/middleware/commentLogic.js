import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUserByCommentId= async (req, res, next)=>{
    const id = Number(req.params.id);
    const comment = await prisma.comment.findUnique({
        where: {
            id:id,
        },
        select:{
            userId:true,
        }
    });
    req.params.userId=comment.userId;

    next();
}

export default {
    findUserByCommentId,
}