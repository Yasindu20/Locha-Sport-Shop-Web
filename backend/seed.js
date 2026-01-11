import mongoose from 'mongoose';
import Admin from './src/models/Admin.js'; // Make sure path is correct
import dotenv from 'dotenv';
dotenv.config();

const createSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...');

        // 1. Delete the broken manual user
        await Admin.deleteOne({ email: "admin@sportsworld.com" });

        // 2. Create a clean user (The code handles the Hashing!)
        const superAdmin = new Admin({
            username: "lochana",
            email: "admin@sportsworld.com",
            password: "LochanaIsABitch", 
            FullName: "Super Administrator",
            role: "super-admin"
        });

        await superAdmin.save();
        console.log('✅ Success! You can now login with "LochanaIsABitch"');
        process.exit();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

createSuperAdmin();