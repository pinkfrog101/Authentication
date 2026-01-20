console.log(__dirname);
const express = require('express');//express is a web framework for Node.js used for building web applications and APIs
const cookieParser = require('cookie-parser');//cookie-parser is a middleware to parse cookies attached to the client request object
const authRoutes = require('./routes/authroutes');//importing the auth routes
const app = express(); // Create an Express application 
app.use(express.json());// Middleware to parse JSON bodies
app.use(cookieParser());// Middleware to parse JSON bodies and cookies
// Use the auth routes for any requests to /auth
app.use('/auth', authRoutes);// Mount the authRoutes at the /auth path
module.exports = app; // Export the app for use in other files

