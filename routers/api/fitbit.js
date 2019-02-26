const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('auth')
})
router.get('/login',(req,res)=>{
    res.send("ta guele");
})
router.get('/redirect',(req,res)=>{
    res.send("ta geule")
})
module.exports = router;
