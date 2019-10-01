const Order=require('../models/order');
const Product=require('../models/product');
const customer=require('../models/customer');
const mongoose=require('mongoose');

exports.orders_get_all=(req,res,next)=>{
    Order.find()
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(docs=>
        {
            res.status(200).json({
                count:docs.length,

                order:docs.map(doc=>{
                    return{
                        _id:doc._id,
                        customerId:doc.customerId,
                        quantity:doc.quantity,
                        product:doc.product,

                    }
                }),

            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}

exports.get_user_orders=(req,res,next)=>{
    const customerid=req.params.customerId;
    Order.find({customerId:customerid})
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(docs=>
        {
            res.status(200).json({
                count:docs.length,
                order:docs.map(doc=>{
                    return{
                        _id:doc._id,
                        customerId:doc.customerId,
                        quantity:doc.quantity,
                        product:doc.product,


                    }
                }),

            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
};

exports.make_new_order=(req,res,next)=>{
    Product.findById(req.body.productId)
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:'Product not found'
                });
            }
            const order=new Order({
                _id:mongoose.Types.ObjectId(),
                quantity:req.body.quantity,
                product:req.body.productId,
                customerId:req.body.customerId

            });
            return  order.save()
        })
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message:'Order stored',
                createOrder:{
                    _id:result._id,
                    product:result.product,
                    quantity:result.quantity,
                    customerId:req.body.customerId
                },
                requests:{
                    type:'GET',
                    url:'http://localhost:3000/orders/'+result._id
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });


}

exports.orders_get_order=(req,res,next)=>{
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order=>{
            if(!order){
                return res.status(404).json({
                    message:"Order not Found"
                })
            }
            res.status(200).json({
                order:order,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/orders'
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })

}

exports.orders_delete_order=(req,res,next)=>{
    Order.remove({_id:req.params.orderId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"Order Removed Succesfully",
                request:{
                    type:'POST',
                    url:'http://localhost:3000/orders',
                    body:{productId:'ID',quantity:'Number'}
                }})

        })
        .catch()
}