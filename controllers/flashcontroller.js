import FlashCard from '../models/flashmodel.js'; 

const enterFlash = async (req, res) => {
  try {

    const { Question, Answer, PhoneNumber, Frequency } = req.body;
    const newFlashCard = new FlashCard({ Question, Answer, PhoneNumber, Frequency });

    await newFlashCard.save(); // Save user to the database

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { enterFlash }; // Use named export