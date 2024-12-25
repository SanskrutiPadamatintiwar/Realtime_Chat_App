const express=require('express')
const authRoutes=require("./routes/auth.route")
const app=express();
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const connectDB=require("./lib/db");
dotenv.config({ path: './src/.env' }); // Specify the path to the .env file


app.use(express.json());
app.use("/api/auth",authRoutes);
app.use(cookieParser());

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
    connectDB();
})