var mongoose=require("mongoose");

var customersSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true},
    password:{type:String, required:true},
    location:String,

});
module.exports=mongoose.model("Customer",customersSchema);