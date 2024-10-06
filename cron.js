const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
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



sendTestMessage();

