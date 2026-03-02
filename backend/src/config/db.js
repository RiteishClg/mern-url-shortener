import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully Connected!")
    } catch (error) {
        console.error("MongoDB connection failed");
        console.error(error.message);
        process.exit(1)
    }
}