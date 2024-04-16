import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';

const app = express();

dotenv.config({ path: 'backend/config/config.env'});

// Connecting to Database
connectDatabase();

app.use(express.json());


// import all routes 
import productRoutes from './routes/products.js'

app.use("/api/v1", productRoutes);

// using error middlewares
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server Started on: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});