import { Router } from "express";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";
import commentRoutes from "./commentRoutes.js";
import authRoute from "./authRoutes.js";

const appRoutes = Router();
appRoutes.use('/posts',postRoutes);
appRoutes.use('/users',userRoutes);
appRoutes.use('/comment',commentRoutes);
appRoutes.use('/',authRoute);

appRoutes.get('/',(req,res)=>{
    return res.json('hi');
});

export default appRoutes;
