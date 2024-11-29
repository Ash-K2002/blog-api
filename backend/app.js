import e from "express";

const app= e();

app.use(e.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log("The app is listening to 3000");
})