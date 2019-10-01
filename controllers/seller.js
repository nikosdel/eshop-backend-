var mongoose=require("mongoose");
var seller=require("../models/seller");
var jwt=require("jsonwebtoken");
var bcrypt=require("bcryptjs");


exports.customer_register= (req,res,next)=> {
    seller.find({username:req.body.username})
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
                        const newCustomer = new seller({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,

                        });
                        newCustomer.save().then(result=>{
                            console.log(result)
                            res.status(201).json({
                                message:'seller created'

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
    seller.find({username:req.body.username})
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