const express = require('express');
const router = express.Router();

//2route  GET api/profile
//2desc   Test route
//@access Publicトークン要らない
router.get('/', (req,res) => res.send('Profile route'));

module.exports = router;