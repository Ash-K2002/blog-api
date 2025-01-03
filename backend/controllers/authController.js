import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
config();
const prisma = new PrismaClient();



const loginController=(req, res, next) => {
    passport.authenticate('local', (err, data, info) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred during authentication.' });
      }
      if (!data) {
        return res.status(401).json({ error: info.message }); // Info message comes from the strategy
      }
      res.json({
        message: "Login successful",
        token: data.token,
        user:{
            id: data.user.id,
            username: data.user.username,
        },
      });
})(req, res, next);
}

passport.use(
    new LocalStrategy(
        async function(username, password, done){
            try{
                const user = await prisma.user.findUnique({
                    where: {
                        username: username
                    },
                    select:{
                        username: true,
                        password: true,
                        id: true,
                        role: true,
                    }
                });
                if(!user){
                    return done(null, false, {
                        message:"Username not found"
                    });
                }

                const match =await bcrypt.compare(password, user.password);
                if(!match){
                    return done(null, false, {
                        message:"Incorrect password"
                    });
                }
                const token = jwt.sign({
                    id: user.id, role: user.role
                },
                process.env.AUTH_ACCESS_KEY
                );

                return done(null, {user, token});
            }
            catch(err){
                return done(err);
            }
        }
    )
);

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.AUTH_ACCESS_KEY,
    },
    async function (jwtPayload, done){
        try{
            const user = await prisma.user.findUnique({
                where: {
                    id: jwtPayload.id,
                },
                select:{
                    username: true,
                    id: true,
                    role: true,
                }
            });
        }
        catch(err){
            return done(err, false);
        }
    }
)
);




const authController= {
    loginController,
}

export default authController;