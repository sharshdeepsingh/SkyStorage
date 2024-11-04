const multer=require('multer');
const firebaseStorage=require('multer-firebase-storage');
const firebase=require('./firebase.config')
const serviceAccount=require('../sdrive-cd153-firebase-adminsdk-tmymk-c0b4b3e8fc.json')



const storage=firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName:'sdrive-cd153.firebasestorage.app',
    unique:true
}) 

const upload=multer({
    storage: storage
})

module.exports=upload;