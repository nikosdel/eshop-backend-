var mongoose=require("mongoose");

var sellerSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true},
    password:{type:String, required:true},
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"

    }


});
module.exports=mongoose.model("Seller",sellerSchema);
