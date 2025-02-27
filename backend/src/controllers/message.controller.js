const User=require("../models/user.model");
const Message=require("../models/message.model");
const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers);
    }catch(err){
        console.error("Error in getUsersForSidebar controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    
    }
}

const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params

        const myId=req.user._id;
        const messages=await Message.find({$or:[{senderId:myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}]})
        res.status(200).json(messages);
    }catch(err){
        console.error("Error in getMessages controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    
    }
}

const sendMessage=async(req,res)=>{

    try{
        const {id:receiverId}=req.params
        const {text,image}=req.body;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save();
        //todo: realtime func happens here socket.io
        
        res.status(201).json(newMessage);
    }catch(err){
        console.error("Error in sendMessage controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    
    }

}


module.exports={getUsersForSidebar,getMessages,sendMessage}