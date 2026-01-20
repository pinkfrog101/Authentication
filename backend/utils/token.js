const jwt = require('jsonwebtoken');//jsonwebtoken is a library for creating and verifying JSON Web Tokens (JWT) for authentication
function generateAccessToken(user) {
  return jwt.sign({id : user._id , email : user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRATION_TIME });//generating a token with expiration time
  //payload is an object with email property
    //secret key is taken from environment variable for security
    //expires in is for time duration of the token created
    //const refreshToken = jwt.sign({username :username, email: email }, process.env.REFRESH_TOKEN_SECRET);//refresh token generation
}
module.exports = { generateAccessToken };