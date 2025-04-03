import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const fileUpload = async (filePath) => {
    try {
        const response = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath); 
        return response;
    } catch (error) {
        fs.unlinkSync(filePath); 
        throw new Error(error.message); 
    }
};

export default fileUpload;
