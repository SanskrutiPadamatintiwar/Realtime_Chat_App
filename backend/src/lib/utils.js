const jwt=require('jsonwebtoken');
const generateToken = (userId,res) => {
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })


    res.cookie("jwt",token,{
        maxAge:1000*60*60*24*7,
        httpOnly:true,  //prevent xss attacks croos-site scripting attacks
        sameSite:"strict", //csrf attacks
        secure:process.env.NODE_ENV!=="development",
    })

    return token;
}


module.exports=generateToken;