const { v2: cloudinary } = require('cloudinary');
const {config} = require('dotenv');
config({ path: './src/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
});

module.exports = cloudinary