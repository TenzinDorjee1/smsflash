import mongoose from 'mongoose';



const FlashCardSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: true, // Question is required
  },
  Answer: {
    type: String,
    required: true, // Answer is required
  },
  PhoneNumber: {
    type: String,
    required: true, // Phone number is required
  },
  Frequency: {
    type: String, 
    required: true,
  }
});



// Create and export the User model
const FlashCard = mongoose.model('FlashCard', FlashCardSchema);

export default FlashCard;