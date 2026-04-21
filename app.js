import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
dotenv.config();


// create the express app
const app = express();

// use the auth routes
app.use(express.json());
app.use('/api/auth', authRoutes);
app.get('/',(req,res)=>{
    res.send("Helloword");
})
app


// use middleware
app.use(cors({
    origin: "*"
}));


// connect to the database
connectDB();

// start the app
const PORT = process.env.PORT || 5000;
app.listen(PORT ,'0.0.0.0', ()=>{
    console.log(`Server listening on port ${PORT}...`);
})
