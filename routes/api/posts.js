//This gonna have a little form area that we can add post, like, comment..etc

const express = require('express');
const router = express.Router();

//2route  GET api/posts
//2desc   Test route
//@access Publicトークン要らない
router.get('/', (req,res) => res.send('Posts route'));

module.exports = router;