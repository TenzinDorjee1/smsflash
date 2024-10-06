import express from 'express';
import twilio from 'twilio';
import FlashCardRoutes from './routes/flashroute.js';
import mongoose from 'mongoose';
import cors from 'cors'; 
const app = express();

// Twilio credentials
const accountSid = 'AC0293c030291b8150bf9b24baa84d2ae1'; // Your Twilio Account SID
const authToken = 'f0f7a19eeba01e3349dc0b96854b8026'; // Your Twilio Auth Token
const client = twilio(accountSid, authToken);



const connectDB = async () => {
    console.log("he")
  try {
    // Ensure your connection string does not expose sensitive information
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://newuser2:newUser2@cluster0.3d8fi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    // jno8nue3t5UQEJ6Q
    await mongoose.connect(mongoURI, {
      // Removed deprecated options
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};





// Function to send a test SMS
const sendTestMessage = async () => {
  try {
    await client.messages.create({
      body: 'Hello! This is a test message from the backend.', // Test message
      from: '+15207299548', // Your actual Twilio phone number
      to: '+17785863952',   // Verified recipient's phone number
    });
    console.log('Test message sent successfully');
  } catch (error) {
    console.error('Error sending test message:', error);
  }
};


const PORT = process.env.PORT || 8013;


app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers in requests
  }));

  app.use(express.json()); // Middleware to parse JSON
  app.use('/api', FlashCardRoutes); // Use user routes
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();

  // Send the test SMS and create verification when the server starts
  
 // sendTestMessage();
});
