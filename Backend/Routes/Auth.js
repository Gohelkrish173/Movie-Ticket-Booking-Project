const express = require('express');
const router = express.Router();
const User = require('../Model/User_Schema');
const errorHandler = require('../Middleware/errorMiddleware');
const authTokenHandler = require('../Middleware/checkAuthToken');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const upload = require('../Middleware/multer');
const uploadToClodinary = require('./imageUploadRoute');

router.get('/test',async(req,res)=>{
  res.json({
    message: "Auth API is working",
  })
});

function createResponce(ok,message,data){
  return{
    ok,
    message,
    data,
  };
}

// create post for Register
router.post('/register',upload.single('user-img'),async (req,res)=>{
  try {
    const {name,email,mobile,password,city} = req.body;
    const existingUser = await User.findOne({email:email});
    
    if(existingUser) {
      return res.status(409).json(createResponce(false,'Email already exists.'));
    }

    const userImg = await uploadToClodinary(req.file.path);

    const newUser = new User({
      name,
      password,
      email,
      mobile,
      city
    });

    console.log("user ",newUser);
    await newUser.save(); // await the save opration
    res.status(201).json(createResponce(true,'User register successfully',newUser));

  } catch (error) {
    console.log("ERROR message is ",error.message);
    console.log("ERROR  ",error);
    return res.status(500).json({"ERROR":"Can not signup!!"});
  }
});

// change user city
router.post('/changeCity', authTokenHandler, async (req, res, next) => {
  const { city } = req.body;
  const user = await User.findOne({ _id: req.userId });

  if (!user) {
      return res.status(400).json(createResponce(false, 'Invalid credentials'));
  }
  else{
      user.city = city;
      await user.save();
      return res.status(200).json(createResponce(true, 'City changed successfully'));
  }
})

// create post for send otp
router.post('/sendotp', async (req,res)=>{})

// create post for login
router.post('/login', async (req,res,next)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    return res.status(400).json(createResponce(false,'Invalid credentials'));
  }

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(400).json(createResponce(false,'Invalid credentials'));
  }

  const authToken = JWT.sign({userId : user._id}, process.env.JWT_Secret_Key);
  const refreshToken = JWT.sign({userId : user._id}, process.env.JWT_Refresh_Secret_Key);
  res.cookie('authToken', authToken, { httpOnly: true});
  res.cookie('refreshToken', refreshToken , { httpOnly : true});

  res.status(200).json(createResponce(true,'Login successful',{
    authToken,
    refreshToken
  }));

});

// create get for checklogin and get data
router.get('/checklogin', authTokenHandler , async (req,res)=>{
  res.json({
    userId : req.userId,
    ok : true,
    message : "User is logged in"
  })
})

router.get('/logout',authTokenHandler, async(req,res)=>{
  res.clearCookie('authToken');
  res.clearCookie('refreshToken');
  res.json({
    ok : true,
    message : 'User logged out successfully'
  })
})

router.get('/getuser',authTokenHandler,async(req,res)=>{
  const user = await User.findOne({_id:req.userId});
  if(!user){
    return res.status(400).json(createResponce(false,'Invalid credentials'));
  }
  else{
    return res.status(200).json(createResponce(true,'user found ',user));
  }
})

router.use(errorHandler)

module.exports = router;