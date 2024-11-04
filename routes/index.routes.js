const express=require('express');
const router=express.Router();
const uploads=require('../config/multer.config')
const fileModel=require('../models/files.models')
const authMiddleware=require('../middleware/auth');
const userModel = require('../models/user.model');
const firebase=require('../config/firebase.config')

//get the home page 
router.get('/home',authMiddleware,async(req,res)=>
{
    const userFiles= await fileModel.find({
        user:req.user.userId
    })
    console.log(userFiles);
    res.render('home',{
        files:userFiles
    });
})

router.post('/upload', authMiddleware, uploads.single('file'), async (req, res) => {
    try {

        const newFile = await new fileModel({
            path: req.file.path,
            originalname: req.file.originalname,
            user: req.user.userId
        });
       const savedFile= await newFile.save(); // Ensure the file is saved to the database
        res.json(savedFile);
    } catch (error) {
        // Handle the error and send a response
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while uploading the file.' });
    }
});

router.get('/download/:path',authMiddleware,async(req,res)=>{

    console.log(req.params,req.user)
    const loggedInUserId=req.user.userId;
    const path=req.params.path;
    const file=await fileModel.findOne({
        user:loggedInUserId,
        path:path
    })
    if(!file)
    {
        return res.status(401).json({
            message:'unauthorized'
        })
    }

    try {
        const bucketName='sdrive-cd153.firebasestorage.app'

        const signedUrl = await firebase.storage().bucket(bucketName).file(path).getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 1000
        });

        console.log(signedUrl);
        res.redirect(signedUrl[0]);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return res.status(500).json({ message: 'Error generating signed URL.' });
    }
});

module.exports=router;