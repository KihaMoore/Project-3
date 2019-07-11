const express = require('express');
const router = express.Router();

//2route  GET api/auth
//2desc   Test route
//@access Publicトークン要らない
router.get('/', (req,res) => res.send('Auth route'));

module.exports = router;