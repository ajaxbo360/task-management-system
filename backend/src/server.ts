import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';




// load env 

dotenv.config();


// connect to mongodb 

connectDB();

// create express app 

const app: Application = express();


// Middleware

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// test routee 

app.get("/", (req, res) => {
    res.json({message:"Task Management API is running!"})
})


// start the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
     console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});