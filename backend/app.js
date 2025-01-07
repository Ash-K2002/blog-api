import e from "express";
import appRoutes from './routes/appRoutes.js';
import passport from "passport";
import cors from 'cors';
const app= e();

app.use(cors());
app.use(e.json());
app.use(e.urlencoded({extended: true}));
app.use(passport.initialize());
app.use('/',appRoutes);
const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log("The app is listening to 3000");
});