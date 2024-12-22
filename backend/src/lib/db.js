const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log("mongodb connection error: ",err);

    }
}


module.exports=connectDB;