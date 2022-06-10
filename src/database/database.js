import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default {
    connectToDatabase: () => {
        mongoose.connect(process.env.DATABASE_URL);
        const db = mongoose.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("Connected to the database!"));
    }
}