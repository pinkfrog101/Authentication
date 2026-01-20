const jwt =  require('jsonwebtoken'); //jsonwebtoken is a library for creating and verifying JSON Web Tokens (JWT) for authentication
//middleware to authenticate token
const authenticateToken = (req, res, next)=> {
  const authHeader = req.headers['authorization'];//getting the authorization header from the request
  const token = authHeader && authHeader.split(' ')[1];// Bearer TOKEN
  if (token == null) return res.sendStatus(401);//if there is no token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {//jwt.verify is to verify the token using the secret key
    if (err){ console.log('JWT error:', err);
       return res.sendStatus(403).json(err);//if token is invalid
    }
    req.user = decoded;//setting the user property of request to the user object obtained from the token
    next();//calling the next middleware or route handler
  });
}
module.exports = authenticateToken;