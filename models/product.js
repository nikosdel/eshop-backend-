var mongoose=require("mongoose");

var productSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    productImage:{type:String,required:true},
    price:{type:Number,required:true}
},);

module.exports= mongoose.model("Product",productSchema);