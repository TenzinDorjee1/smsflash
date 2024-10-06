import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import twilio from 'twilio';
import FlashCardRoutes from './routes/flashroute.js';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { scheduleSMS } from './cron.js';
const app = express();

// Twilio credentials
const accountSid = 'AC0293c030291b8150bf9b24baa84d2ae1'; //process.env.TWILIO_ACCOUNT_SID; 
const authToken = '4671ce9920e1e44fe6c23b63aad488a6' //process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);



const connectDB = async () => {
    
  try {
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://newuser2:newUser2@cluster0.3d8fi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  
    await mongoose.connect(mongoURI, {
      
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};






const PORT = process.env.PORT || 8015;


app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers in requests
  }));

  app.use(express.json()); // Middleware to parse JSON
  app.use('/api', FlashCardRoutes); 
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();


});


  console.log('Checking for flashcards to schedule SMS...');


  setInterval(() => {
    scheduleSMS();
  }, 30000); 