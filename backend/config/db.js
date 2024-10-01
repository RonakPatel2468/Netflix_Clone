import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB connected: " + connectionDB.connection.host);
} catch (error) {
    console.error("Error connecting to MONGODB: " + error.message);
process.exit(1); 
}
};