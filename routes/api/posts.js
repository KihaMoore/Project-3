const express = require('express');
const router = express.Router();

//2route  GET api/posts
//2desc   Test route
//@access Publicトークン要らない
router.get('/', (req,res) => res.send('Posts route'));

module.exports = router;