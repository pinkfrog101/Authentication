const mongoose = require('mongoose');//mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js
//connect to MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)//the connection string is stored in an environment variable for security
         console.log('MongoDB connected')
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);// Exit process with failure
    }
};
module.exports = connectDB;