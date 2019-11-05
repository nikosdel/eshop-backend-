var mongoose=require("mongoose");
var customer=require("../models/customer");
var bcrypt=require("bcryptjs");
var jwt=require("jsonwebtoken");
exports.customer_register= (req,res,next)=> {
    customer.find({username:req.body.username})
        .exec()
        .then(newCustomer=>{
            if(newCustomer.length>=1){
                return res.status(409).json({
                    message: "username exists"
                });
            } else{
                bcrypt.hash(req.body.password,10,(err,hash)=> {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const newCustomer = new customer({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,
                            location:req.body.location
                        });
                        newCustomer.save().then(result=>{
                            console.log(result)
                            res.status(201).json({
                                message:'User created'

                            });
                        }).catch(err=>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })

            }
        })
        .catch();

};

exports.customer_login=(req,res)=> {
    customer.find({username:req.body.username})
        .exec()
        .then(customer=>{
            if(customer.length<1){
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
            bcrypt.compare(req.body.password,customer[0].password,(err,result)=>{
                if(err){

                    console.log(err);
                    res.status(401).json({
                        message:"Auth failed"
                    });
                }
                if(result){
                    const token = jwt.sign({
                            username:customer[0].username,
                            customerId:customer[0]._id
                        },"secret",
                        {
                            expiresIn: "1h"

                        });
                    return res.status(200).json({
                        message:"Auth successful",
                        customer: {
                            id: customer[0]._id,
                            location: customer[0].location,
                            username: customer[0].username,
                            token: token
                        }
                    });
                }
                res.status(401).json({
                    message:"Auth failed"

                });

            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};


exports.customer_update=(req,res,next)=>{
    const id=req.params.customerId;
    // const updateOps={};
    // for(const ops of req.body){
    //     updateOps[ops.propName]=ops.value;
    // }
    customer.update({_id:id},req.body)
        .exec()
        .then(result=>{

            res.status(200).json({
                message:'Product Updated',

            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}
exports.customer_delete=(req,res,next)=>{
    customer.remove({_id:req.params.userId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"User Deleted"}
            )
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}