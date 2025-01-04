import {PrismaClient, Role} from '@prisma/client';
import userValidator from '../validator/userValidator.js';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

//------------CREATE----------------//

function validateRoles(role){
    const roles = Object.values(Role);
    return roles.includes(role);
}

const createUserPost= [
    userValidator.createValidator,
    async(req, res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors,
        });
    }
    if(!validateRoles(req.body.role)){
        return res.status(400).json({
            error: 'Invalid role, check valid user roles in documentation'
        });
    }
    

    try{
        const hashedPassword= await bcryptjs.hash(req.body.password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role
            }
        });
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
        });
    }catch(err){
        console.log(err);
        if(err.code==="P2002")
        {
        return res.status(400).json({error: 'username already exists'});
        }
        res.status(500).json({error: 'Internal server error'});
    }
    
    }
]

// ------------READ---------------//

async function findAllUsers(req, res){
    try{
        const allUsers = await prisma.user.findMany({
            select:{
                id:true,
                username: true,
            }
        });
        res.status(200).json(allUsers);
    }
    catch(err){
        console.error("An error ocurred:",err);
        res.status(500).json(
            {error: 'Internal server error'}
        );
    }
}

async function findUser(req, res){
    try{
        const id = req.params.userId;
        const user = await prisma.user.findUnique({
            where:{id: Number(id)},
            select:{
                id: true,
                username: true,
                role: true,
            }
        });

        if(!user){
           return res.status(404).json({
                error: "User data not found",
            });
        }

        res.status(200).json(user); 
        
    }
    catch(err){
        console.error("An error occured",err);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
}

async function getRoles(req, res){
    const roles = Object.values(Role);
    res.status(200).json({
        roles
    });
}


//---------UPDATE------------//

const updateUserPost=[
    userValidator.updateValidator,
    async(req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });        
        }

        try {
            const user = await prisma.user.findUnique({
                where:{id: Number(req.params.userId)},
            });
            if(!user){
                return res.status(404).json({
                    error: "User not found"
                });
            }

            const updatedData={};

            if(req.body.password){
                const updatedPassword = await bcryptjs.hash(req.body.password, 10);
                updatedData.password = updatedPassword;
            }

            if(req.body.role){
                const role = req.body.role;
                if(!validateRoles(role)){
                    return res.status(400).json({
                        error: 'Invalid user role'
                    });
                }
                updatedData.role = role;
            }
            
            if(Object.keys(updatedData).length===0){
                return res.status(400).json({
                    error: 'No valid fields to update'
                });
            }

            await prisma.user.update({
                where: {id: Number(req.params.id)},
                data: updatedData
            });

            res.status(200).json({
                message: "user details updated"
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

]


//---------DELETE------------//

async function deleteUser(req, res){
    try{
        const userId = Number(req.params.userId);
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });
        if(!user){
            return res.status(404).json({
                error: "user not found"
            });
        }
        await prisma.user.delete({
            where: {id: userId}
        });
        res.status(204).end();
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}


const userController ={
    createUserPost,
    findAllUsers,
    findUser,
    getRoles,
    updateUserPost,
    deleteUser,
}

export default userController;