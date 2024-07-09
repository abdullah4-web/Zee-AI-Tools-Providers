import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import aiRoutes from './routes/aiRoutes.js';
import productRoutes from './routes/routes.js';
import userRouter from "./routes/userRoutes.js";
import replicateRouter from "./routes/replicateRouter.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

// Increase server timeout to 5 minutes (adjust as needed)
const serverTimeout = 300000; // 5 minutes in milliseconds
app.use((req, res, next) => {
  res.setTimeout(serverTimeout, () => {
    console.log(`Request has timed out. More than ${serverTimeout} milliseconds.`);
    res.status(408).json({ message: 'Request Timeout' });
  });
  next();
});

// API routes
app.get('/', (req, res) => {
  res.json({ message: "API is working" });
});
app.use('/api/users', userRouter);
app.use('/api/v1/ai', aiRoutes);
app.use('/api', productRoutes);
app.use('/api/rep', replicateRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Set port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
