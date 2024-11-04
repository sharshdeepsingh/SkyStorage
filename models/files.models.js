const mongoose=require('mongoose')




const fileSchema= mongoose.Schema({
   path:{
    type:String,
    required:[true,'path is requred']
   },
   originalname:{
    type:String,
    required:[true,'originalName is required']
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:[true,'user is required']
   }
})


const file=mongoose.model('file',fileSchema)

module.exports=file;