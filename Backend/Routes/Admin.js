const express = require('express');
const router = express.Router();
const Admin = require('../Model/Admin_Schema');
const errorHandler = require('../Middleware/errorMiddleware');
const authTokenHandler = require('../Middleware/checkAuthToken');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createResponce(ok,message,data){
  return{
    ok,
    message,
    data,
  };
}

// create post for Register
router.post('/register', async (req,res,next)=>{
  try {
    const {name,email,password} = req.body;
    const existingAdmin = await Admin.findOne({email});
    
    if(existingAdmin) {
      return res.status(409).json(createResponce(false,'Email already exists.'));
    }

    const newAdmin = new Admin({
      name,
      email,
      password
    });
  
    await newAdmin.save(); // await the save opration
    res.status(201).json(createResponce(true,'User register successfully'));

  } catch (error) {
    next(error);
  }
});

// create post for login
router.post('/login', async (req,res,next)=>{
  try{
  const {email,password} = req.body;
  const admin = await Admin.findOne({email});

  if(!admin){
    return res.status(400).json(createResponce(false,'Invalid credentials'));
  }

  const isMatch = await bcrypt.compare(password,admin.password);
  if(!isMatch){
    return res.status(400).json(createResponce(false,'Invalid credentials'));
  }

  const authToken = JWT.sign({adminId : admin._id}, process.env.JWT_Admin_Secret_Key);
  const refreshToken = JWT.sign({adminId : admin._id}, process.env.JWT_Admin_Secret_Key, {expiresIn : '1d'});
  res.cookie('authToken', authToken, { httpOnly: true});
  res.cookie('refreshToken', refreshToken , { httpOnly : true});

  res.status(200).json(createResponce(true,'Login successful',{
    authToken,
    refreshToken
  }));

  }catch(e){
    next(e);
  }

});


// create get for checklogin and get data
router.get('/checklogin', authTokenHandler , async (req,res)=>{
  res.json({
    adminId : req.adminId,
    ok : true,
    message : "Admin is logged in"
  })
});

router.use(errorHandler)

module.exports = router;