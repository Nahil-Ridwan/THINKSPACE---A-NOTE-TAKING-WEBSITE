import mongoose from "mongoose";
export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGODB CONNECTED");
    } catch (error) {
        console.error("CAN'T CONNECT",error);
        process.exit(1); // EXIT WITH FAILURE
    }
}