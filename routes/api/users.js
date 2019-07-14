//This file will handle like register the user, adding users.

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
//gravatar is allowed you to atatch profile image to your email..etc we want this to be in the User model to be avilable anytime.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/');
const User = require('../../models/User');

//@route                        POST api/users
//@desc/what this does          Register user..etc
//@access value                 Public(Which means we don't need token for)

//validation for name,email and password
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  
  check('email', 'Please include a valid email').isEmail(),
  
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
],
  //Handle the response If there is error, we want to send the error message back.
  //If it's success,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

     // see if user exist, serch by email
    try {
      let user = await User.findOne({ email });
      //  in case if exist
      if (user) {
        return res
        .status(400).json({ errors: [{ msg: 'User already exist' }] });
      }
       // We pass the user's email into a method and that will get us to the url of
       // the grvatar.
      const avatar = gravatar.url(email, {
        //  s=size r=rating mm=default-image
        s: "200",
        r: "pg",
        d: "mm"
      });


      //use user from line41 and set that to new user and passing in the object with the field that we want.
      // This doesn't save the user, just create new instant, we have to call "user.save()'" in order to save it to the DB.
      user = new User({
        name,
        email,
        avatar,
        password
      });
      //we can get promiss from bcrypt.genSalt so we want to use await and we pass in the (10)which recommended from doccumentation. 
      // more we have number more secure but it'll be slow.
      const salt = await bcrypt.genSalt(10);
      // now we want to take this password from line 62 and set it to await bcrypt.hash(password, salt) and create hash.
      user.password = await bcrypt.hash(password, salt);

      // Anything return the promiss, we have to put await in front 
      
      await user.save();

       const payload = {
         user: {
           id: user.id
         }
       };

       // From line 58..Create a user, line66..hash the password,line72 save the user data to the db,
       //line74..get the payload which include the userID.line78..passing the payload, passing the secret and expire seconds and inside of the callback,we'll get other err or token
       
       //So the way that this works in with the Jason Webb token package that we already installed is we need
       // to first sign it (line 88)and we pass in our payload and then we can have a callback or we send a response
       // back to the client with that token.
        //And then later on what we need to do is protect our roots by creating a piece of middleware(auth.js) that will
        // verify the token.
       jwt.sign(
         payload,
         config.get('jwtSecret'),
         { expiresIn: 360000 },
         (err, token) => {
           if (err) throw err;
           res.json({ token });

         });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');

    }
  }
);


module.exports = router;
