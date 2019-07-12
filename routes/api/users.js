//This file will handle like register the user, adding users.

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
//gravatar is allowed you to atatch profile image to your email..etc we want this to be in the User model to be avilable anytime.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//
const { check, validationResult } = require('express-validator/')
const User = require('../../models/User');

//@route                        POST api/users
//@desc/what this does          Register user..etc
//@access value                 Public(Which means we don't need token for)

//With in our route we add second parameter as middileware we call this "check" and passing the fields such user name and the add the rule.
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  
  check('email', 'Please include a valid email').isEmail(),
  
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
],
  //Handle the response
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //Get users gravatar(pass the user's email into a method)
    try {
      let user = await user.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exist' }] });
      }

      //  pass in email and some opstion{}
      const avatar = gravatar.url(email, {
        //  s=size r=rating mm=default-image
        s: "2",
        r: "pg",
        d: "mm"
      })


      //   use user from line32 and set that to new user and passing in the object with the field that we want.
      // This doesn't save the user, just create new instant, we have to call "user.save'" in order to save it to the DB.
      user = new user({
        name,
        email,
        avatar,
        password
      });
      //we can get promiss from bcrypt.genSalt so we want to use await and we pass in the (10)which recommended from doccumentation. 
      // more we have number more secure but it'll be slow.
      const salt = await bcrypt.genSalt(10);
      // now we want to take the password from line 54 and set it to await bcrypt.hash(password, salt) and create hash.
      user.password = await bcrypt.hash(password, salt);

      // Anything return the promiss, we have to put await
      
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      // From line 52..Create a user, line60..hash the password,line67 save the user date to the db,
      //line69..get the payload which include the userID.line78..passing the payload, passing the secret and expire seconds and inside of the callback,we'll get eother err or token

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
