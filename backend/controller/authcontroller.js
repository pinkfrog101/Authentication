const bcrypt = require('bcrypt');//bcrypt is a library for hashing passwords securely 
const jwt = require('jsonwebtoken');//jsonwebtoken is a library for creating and verifying JSON Web Tokens (JWT) for authentication
const User = require('../models/userModel');// Importing the User model
const { generateAccessToken } = require('../utils/token');
//POST request to register a new user 
const cookieParser = require('cookie-parser');
//function to handle user registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check existing user
    // await is used to wait for the promise returned by User.findOne() to resolve
    const existingUser = await User.findOne({ email });//.findOne() method is used to find a single document in the database that matches the specified criteria
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });// res.status is for setting the HTTP status code of the response(from server to client)
      //res.json is to send a JSON response from server to client 
    }

    // Hash password
    //const salt = await bcrypt.genSalt(10); you could write this or directly pass the rounds to hash function as below
    const hashedPassword = await bcrypt.hash(password, 10);//hashing the password with a salt round of 10

    // Create user
    // .create() method is a Mongoose method that creates a new document in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
//res is required to send response back to client (from server to client)
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error : error });
  }
};
// for login
exports.login =  async (req, res) => {
  try { 
    const { email, password } = req.body;// req is from client to server

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const newAccessToken = generateAccessToken(user);//generating access token
    const newRefreshToken = jwt.sign({name : user.username, email : user.email} ,process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});//generating refresh token manually
    user.refreshToken = newRefreshToken;//storing refresh token in database
    await user.save();//saving the user document with the new refresh token
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({
      message: 'Login successful',
      access_token: newAccessToken  
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error : error.message });
  }
  
};
//endpoint to refresh token(create a new access token using refresh token)
exports.refresh_Token =  async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;//getting the refresh token from the request body using cookie parser
  //token here is refresh token 
  if (!incomingRefreshToken) return res.sendStatus(401);//if there is no refresh token
  const user = await User.findOne({refreshToken : incomingRefreshToken });//finding the user with the given refresh token
  if (!user) return res.sendStatus(403);//if refresh token is invalid
   jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET,async (err) =>  {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateAccessToken(user);//generating new access token
    const recycledRefreshToken = jwt.sign({name : user.username},process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});//generating new refresh token
    user.refreshToken = recycledRefreshToken;//updating the refresh token in database
    await user.save();//saving the user document with the new refresh token
    res.cookie('refreshToken', recycledRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      res.json({ newAccessToken });//sending the new access token back to client
  })
};
//for logout
exports.logout = async (req, res) => {
  // Invalidate the refresh token
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(400);
  const user =await User.findOne({ refreshToken : refreshToken });
  if (!user) return res.sendStatus(204);
  user.refreshToken = null;//removing the refresh token from database
  await user.save();//saving the user document without the refresh token 
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }); 
  res.status(200).json("Logged out successfully");
};



