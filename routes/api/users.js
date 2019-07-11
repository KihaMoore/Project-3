const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator')


//2route  POST api/users
//2desc   Register user
//@access Publicトークン要らない
router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6})
],
  (req,res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array() });
      }


   //see if user exist

 

   //Get users gravatar



   //Encrypt password



   //Rerurn jsonwebtoken
   
   
   
   
      //このルートに送られてくるオブジェクトが見たい
    console.log(req.body);
　　　res.send('user route');
});   

module.exports = router;