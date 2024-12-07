import e from "express";
import appRoutes from './routes/appRoutes.js';
const app= e();

app.use(e.json());
app.use(e.urlencoded({extended: true}));

app.use('/',appRoutes);
const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log("The app is listening to 3000");
});