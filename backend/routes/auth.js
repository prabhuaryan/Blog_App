const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');

router.post('/register', async (req, res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password, 10);
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            name:req.body.name,
            password:hashedPassword
        });
        const user= await newUser.save();
        const {password, ...others}=user._doc;
       return res.status(201).json(others);

    }catch(err){
        return res.status(500).json(err);
    }
});

router.post('/login',async (req, res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user){
            res.status(500).json({
                message:"Please provide valid username and password"
            })
        }
        const matchedPassword= await bcrypt.compare(req.body.password, user.password);
        if(!matchedPassword){
            res.status(500).json({
                message:"Please provide valid username and password"
            })
        }
        const {password, ...other}=user._doc;
        return res.status(200).json(other);
    }

    catch(err){
        return res.status(500).json(err);
    }
})

module.exports =router;