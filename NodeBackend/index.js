const mongoose = require('mongoose');
const express = require('express');
const Users = require('./inputschema');
const app = express();
const port = 5000;

app.use(express.json());

// Configure CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// MongoDB connection string (use environment variables in production)
const DB = 'mongodb+srv://richasahu4190:KWkAuMd3xIzQgfJa@cluster0.ddmj8cs.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

app.post('/', async (req, res) => {
  const { input_text } = req.body;
   console.log(req.body)
  try {
    if (!input_text) {
      return res.status(400).json({ error: 'Please enter some text' });
    }

    const user = new Users({
      input_text,
    });

    await user.save();
    res.status(201).json({ input_text: user.input_text, message: 'User created successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
