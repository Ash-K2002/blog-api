import { Router } from "express";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";

const appRoutes = Router();
appRoutes.use('/posts',postRoutes);
appRoutes.use('/users',userRoutes);


appRoutes.get('/',(req,res)=>{
    return res.json('hi');
});

export default appRoutes;
