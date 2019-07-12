//This file will have route that have anything to do with profiles,fetching them adding them updating them...etc

const express = require('express');
const router = express.Router();

//2route  GET api/profile
//2desc   Test route
//@access Publicトークン要らない
router.get('/', (req,res) => res.send('Profile route'));

module.exports = router;