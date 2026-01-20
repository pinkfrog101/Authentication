const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware');
const controller = require('../controller/authcontroller');
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh-token', controller.refresh_Token);
router.delete('/logout', controller.logout);
//get request to root route to check if server is running
router.get('/',authenticateToken, (req, res) => {// authenticateToken is a middleware function to authenticate the token
  try{
  res.json({ message: 'Authenticated', user: req.user });
  }catch(err){
    res.status(500).json({ message: 'Server error', error : err });
  }
});
 module.exports = router;