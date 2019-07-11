const express = require('express');
const router = express.Router();

//2route  GET api/users
//2desc   Test route
//@access Publicトークン要らない
router.get('/', (req,res) => res.send('user route'));

module.exports = router;