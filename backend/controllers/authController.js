import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
config();
const prisma = new PrismaClient();

async function loginController(req, res){
    try {
        const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return res.status(400).json({
            error:"username and password are required"
        });
    }

    const currUser = await prisma.user.findUnique({
        where: {
            username: username
        },
        select:{
            id: true,
            username: true,
            password: true,
            role: true,
        }
    });

    if(!currUser){
        // Here we delay the process to mitigate timing attacks
        await new Promise((resolve)=> setTimeout(resolve, 100));
        return res.status(404).json({
            error: "Invalid username or password"
        });
    }
    const passwordMatch = await bcrypt.compare(password, currUser.password);
    if(!passwordMatch){
        await new Promise((resolve)=> setTimeout(resolve, 100));
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }
    

    const accessToken = jwt.sign({
        id: currUser.id,
        role: currUser.role
    }, process.env.AUTH_ACCESS_KEY);

    res.status(200).json({
        accessToken
    });

    } catch (error) {
    
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
    
}

const authController= {
    loginController,
}

export default authController;