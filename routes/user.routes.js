const express=require('express')
const router=express.Router();
const {body,validationResult}=require('express-validator')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

//  for signup   route is :   /user/test-route
router.get('/register',(req,res)=>
{
    res.render('register')
})

router.post('/register',
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
    
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({errors:errors.array(),message:'Invalid Data'})
        }
  const{username,email,password}=req.body;
  const hashPassword=await bcrypt.hash(password,10)
  const newUser= new userModel({username,email,password:hashPassword});
  const savedUser= await newUser.save();
res.json(savedUser);
})


//for login   route is: /user/login
router.get('/login',(req,res)=>
{
    res.render('login');
})

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:6}),
    async(req,res)=>{


        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({error:errors.array(),
                message:'invalid data'
            })
        }

        const{username,password}=req.body;

        const user= await userModel.findOne({
            username:username
        })
        if(!user)
        {
           return  res.status(400).json({message:'username or password is incorrect'})
        }

        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(400).json({message:'username or password is incorrect'})
        }

        //if password matches then we generate jsonWebToken
        const token=jwt.sign({
            userId: user._id,
            email:user.email,
            username:user.username
        },
        process.env.JWT_SECRET,
    )
        res.cookie('token',token)
        res.send('logged in')

    }
)






module.exports=router;

