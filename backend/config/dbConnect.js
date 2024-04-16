import mongoose from 'mongoose';
import dotenv from 'dotenv';


// Load environment variables from the .env file
dotenv.config({ path: 'backend/config/config.env'});

console.log("DB_LOCAL_URI:", process.env.DB_LOCAL_URI);

export const connectDatabase = () => {
    let DB_URI = process.env.DB_LOCAL_URI || process.env.DB_URI;

    if (!DB_URI) {
        console.error("MongoDB URI not found in environment variables.");
        return;
    }

    mongoose.connect(DB_URI, {
    }).then((con) => {
        console.log(`MongoDB Database Connected with Host: ${con.connection.host}, Database: ${con.connection.db.databaseName}`);
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

