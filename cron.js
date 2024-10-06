// const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
// const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
// const client = twilio(accountSid, authToken);


// const connectDB = async () => {
//     console.log("he")
//   try {
//     // Ensure your connection string does not expose sensitive information
//     const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://newuser2:newUser2@cluster0.3d8fi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//     // jno8nue3t5UQEJ6Q
//     await mongoose.connect(mongoURI, {
//       // Removed deprecated options
//     });

//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };





// // Function to send a test SMS
// const sendTestMessage = async () => {
//     try {
//       await client.messages.create({
//         body: 'Hello! This is a test message from the backend.', // Test message
//         from: '+15207299548', // Your actual Twilio phone number
//         to: '+17785863952',   // Verified recipient's phone number
//       });
//       console.log('Test message sent successfully');
//     } catch (error) {
//       console.error('Error sending test message:', error);
//     }
//   };



// sendTestMessage();


import dotenv from 'dotenv';
dotenv.config()

import cron from 'node-cron';
import FlashCard from './models/flashmodel.js'; // Mongoose model
import twilio from 'twilio'; // Or use AWS SDK if sending via AWS SNS

const accountSid = 'AC0293c030291b8150bf9b24baa84d2ae1'; //process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = '4671ce9920e1e44fe6c23b63aad488a6' //process.env.TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
console.log('Twilio Account SID:', accountSid); // Check if this prints the SID
console.log('Twilio Auth Token:', authToken);   // Check if this prints the Auth Token
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = (phoneNumber, message) => {
  client.messages
    .create({
      body: message,
      from: '+15207299548', // Your Twilio number or AWS SNS number
      to: phoneNumber,
    })
    .then((message) => console.log(`SMS sent: ${message.sid}`))
    .catch((err) => console.error(`Failed to send SMS: ${err}`));
};

// Scheduler function
export const scheduleSMS = async () => {
    try {
      const flashcards = await FlashCard.find({}); // Use async/await to fetch flashcards
  
      flashcards.forEach((card) => {
        const frequencyInHours = parseFloat(card.Frequency); // Use parseFloat for decimals
        const phoneNumber = card.PhoneNumber;
        const message = `Flashcard Question: ${card.Question}. Answer: ${card.Answer}`;
      
        console.log(`Scheduling SMS for phone number ${phoneNumber} every ${frequencyInHours} hour(s)`);
      
        if (!isNaN(frequencyInHours) && frequencyInHours > 0) {
          // Convert hours to minutes
          const frequencyInMinutes = Math.floor(frequencyInHours * 60); // Convert to whole minutes
      
          // Schedule SMS based on frequency in minutes
          cron.schedule(`*/${frequencyInMinutes} * * * *`, () => { // Updated to minute-based scheduling
            sendSMS(phoneNumber, message);
          });
        } else {
          console.error(`Invalid frequency for card: ${card}. Frequency: ${card.Frequency}`);
        }
      });
    } catch (err) {
      console.error('Error fetching flashcards:', err);
    }
  };
  