const Firebase=require('firebase-admin')
const serviceAccount=require('../sdrive-cd153-firebase-adminsdk-tmymk-c0b4b3e8fc.json')

const firebase=Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: '//sdrive-cd153.firebasestorage.app'
})

module.exports=Firebase;