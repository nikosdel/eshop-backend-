var mongoose=require("mongoose");

var sellerSchema=new mongoose.Schema({
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"

    }
    ]
});
module.exports=mongoose.model("Seller",sellerSchema);
