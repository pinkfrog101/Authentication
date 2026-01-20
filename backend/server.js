require('dotenv').config();// Load environment variables from .env file
//you NEED to include this at the very top before any other imports to ensure environment variables are available 
const express = require('express');//importing express framework
const app = require('./app');//importing the app from app.js
app.use(express.json());//you NEED to include this to use POST request body
const connectDB = require('./config/db');//importing the database connection function
//calling the function to connect to the database
connectDB();



// to start the port specified to app on which it is done
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
