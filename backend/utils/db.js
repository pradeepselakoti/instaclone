import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Ensure that mongoose.connect is awaited to handle it properly
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connectDB;
