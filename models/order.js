mongoose=require("mongoose");

var orderSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   quantity:{type:Number, default:1},
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },

    customerId:{

            type:mongoose.Schema.Types.ObjectId,
            ref:"Customer"
    }
});

module.exports=mongoose.model("Order",orderSchema);