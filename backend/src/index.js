const express=require('express')
const authRoutes=require("./routes/auth.route")
const app=express();
const dotenv=require("dotenv");
dotenv.config({ path: './src/.env' }); // Specify the path to the .env file

app.use("/api/auth",authRoutes);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})