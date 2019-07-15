//This file will handle getting json webtoken for authentication.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/');

const User = require('../../models/User');
//@route   GET api/auth
//@desc    Authenticate user & get token
//@access  Publicトークン要らない
router.get('/', auth, async (req,res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
  res.json(user);
  }catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});
   
//@route                        POST api/users
//@desc/what this does          Register user..etc
//@access value                 Public(Which means we don't need token for)

//With in our route we add second parameter as middileware we call this "check" and passing the fields such user name and the add the rule.
router.post('/', [ 
  check('email', 'Please include a valid email').isEmail(),
  
  check(
    'password',
    'Password is required'
  ).exists()
],
  //Handle the response If there is error, we want to send the error message back.
  //If it's success,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

   
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
        .status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
    //bcrypt has compare()method.
     const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
        .status(400).json({ error: [{ msg: 'Invalid Credentials'}] });
      }

    
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
      
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');

    }
  }
);
module.exports = router;