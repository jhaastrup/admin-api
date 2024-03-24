// Import required modules
import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';

require('dotenv').config(); // Load environment variables from .env file
import studentRoutes from '../src/routes/student';
import adminRoutes from '../src/routes/admin';
import courseRoutes from '../src/routes/course';



const app:Express = express();

// Set up middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB connection URI from .env file
const mongoURI = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define routes
app.get('/', (req: Request, res:Response) => {
  res.send('Welcome to Kidsthatcode LMS!');
}); 
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);

// Set up error handling middleware
app.use((err:Error, req:Request, res:Response) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Define port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Kidsthatcode Server is running on http://localhost:${PORT} 🚀`);
});
