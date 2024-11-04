const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    username:{type:String,required:true,trim:true,lowercase:true,unique:true,minlength:[3,'Username must be atleast 3 character long']},
    email:{type:String,require:true,trim:true,minlength:[13,'email must be atleast 13 character long']},
    password:{type:String,required:true,trim:true,minlength:[5,'password must be atleast 5 character long']}
})
const userModel= mongoose.model('user',userSchema);


module.exports=userModel;
