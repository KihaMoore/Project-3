const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator/check')

//2route  POST api/users
//2desc   Register user
//@access Publicトークン要らない
router.post('/', (req,res) => {
    //このルートに送られてくるオブジェクトが見たい
    console.log(req.body);
　　　res.send('user route');
});   

module.exports = router;