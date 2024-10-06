// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Box, Button, Typography, Paper, TextField, MenuItem, FormControl, Select, InputLabel, Snackbar, Alert } from '@mui/material';

function Dashboard() {
  const [flashCardQuestion, setFlashCardQuestion] = useState('');
  const [flashCardAnswer, setFlashCardAnswer] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [frequency, setFrequency] = useState('');
  const [flashcards, setFlashcards] = useState([]); // State to store flashcards
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state for alerts

  // Handle Flashcard Question and Answer Change
  const handleFlashCardChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Handle Form Submission (SMS and Flashcards)
  const handleSubmit = () => {
    if (phoneNumber && frequency && flashCardQuestion && flashCardAnswer) {
      const newFlashcard = {
        flashCardQuestion,
        flashCardAnswer,
        phoneNumber,
        frequency,
      };

      // Save the new flashcard to the list
      setFlashcards([...flashcards, newFlashcard]);

      // Clear the form after submission
      setFlashCardQuestion('');
      setFlashCardAnswer('');
      setPhoneNumber('');
      setFrequency('');

      // Show a snackbar alert
      setOpenSnackbar(true);
    } else {
      alert('Please fill in all the fields.');
    }
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', p: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '900px', mb: 4 }}>
        <Typography variant="h4" color="primary">
          OneFlash
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Welcome, User
        </Typography>
      </Box>

      {/* Flashcard Editor */}
      <Paper elevation={6} sx={{ p: 4, mb: 4, width: '100%', maxWidth: '900px' }}>
        <Typography variant="h5" gutterBottom>
          Create Flashcard
        </Typography>
        <TextField
          label="Question"
          value={flashCardQuestion}
          onChange={handleFlashCardChange(setFlashCardQuestion)}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Answer"
          value={flashCardAnswer}
          onChange={handleFlashCardChange(setFlashCardAnswer)}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Phone Number Input */}
        <Typography variant="h6" gutterBottom>
          Receive Flashcards via SMS
        </Typography>
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={handleFlashCardChange(setPhoneNumber)}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Frequency Dropdown */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>How Often to Receive Flashcards</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="How Often to Receive Flashcards"
          >
            <MenuItem value="1">Every 1 hour</MenuItem>
            <MenuItem value="2">Every 2 hours</MenuItem>
            <MenuItem value="4">Every 4 hours</MenuItem>
            <MenuItem value="6">Every 6 hours</MenuItem>
            <MenuItem value="12">Every 12 hours</MenuItem>
            <MenuItem value="24">Once a day</MenuItem>
            <MenuItem value="custom">Custom time</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ py: 1.5 }}
        >
          Save Flashcard & SMS Setup
        </Button>
      </Paper>

      {/* Snackbar for confirmation alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000} // Close after 4 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Positioned at the bottom center
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Flashcard and SMS setup saved successfully!
        </Alert>
      </Snackbar>

      {/* Display saved flashcards */}
      {flashcards.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: '900px', mt: 4 }}>
          <Typography variant="h6">Saved Flashcards</Typography>
          {flashcards.map((card, index) => (
            <Paper key={index} elevation={3} sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle1">Q: {card.flashCardQuestion}</Typography>
              <Typography variant="subtitle2">A: {card.flashCardAnswer}</Typography>
              <Typography variant="body2">SMS to: {card.phoneNumber}, Frequency: Every {card.frequency} hour(s)</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
