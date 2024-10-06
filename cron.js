import dotenv from 'dotenv';
dotenv.config()

import cron from 'node-cron';
import FlashCard from './models/flashmodel.js'; 
import twilio from 'twilio'; 

const accountSid = 'AC0293c030291b8150bf9b24baa84d2ae1'; 
const authToken = '4671ce9920e1e44fe6c23b63aad488a6' 
console.log('Twilio Account SID:', accountSid);
console.log('Twilio Auth Token:', authToken);  
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = (phoneNumber, message) => {
  client.messages
    .create({
      body: message,
      from: '+15207299548',
      to: phoneNumber,
    })
    .then((message) => console.log(`SMS sent: ${message.sid}`))
    .catch((err) => console.error(`Failed to send SMS: ${err}`));
};

// Scheduler function
let scheduledFlashcards = {}; // Hash map to track scheduled flashcards

export const scheduleSMS = async () => {
  try {
    const flashcards = await FlashCard.find({}); // Fetch flashcards from the database

    flashcards.forEach((card) => {
      const cardKey = card._id.toString(); // Unique key for each flashcard
      const frequencyInHours = parseFloat(card.Frequency); 
      const phoneNumber = card.PhoneNumber;
      const message = `Flashcard Question: ${card.Question}. Answer: ${card.Answer}`;

      // Check if the flashcard is already scheduled
      if (!scheduledFlashcards[cardKey]) {
        console.log(`Scheduling SMS for phone number ${phoneNumber} every ${frequencyInHours} hour(s)`);

        if (!isNaN(frequencyInHours) && frequencyInHours > 0) {
          const frequencyInMinutes = Math.floor(frequencyInHours * 60); 
          
          // Schedule the SMS using cron
          cron.schedule(`*/${frequencyInMinutes} * * * *`, () => { 
            sendSMS(phoneNumber, message);
          });

          // Mark the flashcard as scheduled in the hash map
          scheduledFlashcards[cardKey] = true;
        } else {
          console.error(`Invalid frequency for card: ${card}. Frequency: ${card.Frequency}`);
        }
      } else {
        console.log(`Flashcard with ID ${cardKey} is already scheduled.`);
      }
    });
  } catch (err) {
    console.error('Error fetching flashcards:', err);
  }
};
