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

// Set port
const PORT = process.env.PORT || 8080;



// API routes
app.get('/', (req, res) => {
  res.json({ message: "API is working" });
});
app.use('/api/users', userRouter);
app.use('/api/v1/ai', aiRoutes);
app.use('/api', productRoutes);
app.use('/api/rep', replicateRouter);



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//const __dirname = path.resolve();
//app.use(express.static(path.join(__dirname, './client/build')));
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, './client/build/index.html'));
//});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
