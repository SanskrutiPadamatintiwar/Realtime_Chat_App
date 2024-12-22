const signup = (req, res) => {
    const {fullName,email,password}=rq.body;
    try{
        //hash passwords
        



    }catch(err){

    }
};

const login = (req, res) => {
    // Extract user data from request
   
    // TODO: Add logic to authenticate user
    
    res.send("User logged in successfully");
};

const logout = (req, res) => {
    // TODO: Add logic to handle user logout
    
    res.send("User logged out successfully");
};

module.exports = {
    signup,
    login,
    logout
};