import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.warn(`Missing Cloudinary configuration: ${missingVars.join(', ')}`);
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Force HTTPS
});

// Test configuration
try {
    await cloudinary.api.ping();
} catch (error) {
    console.warn('Cloudinary configuration test failed:', error.message);
}

export default cloudinary;
