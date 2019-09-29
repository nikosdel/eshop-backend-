const Product=require('../models/product');
exports.products_get_all_products=(req,res,next)=>{
    Product.find()
        .exec()
        .then(docs=>{
            const response={

                products:docs.map(doc=>{
                    return {
                        name:doc.name,
                        price:doc.price,
                        _id:doc._id,
                        image:'https://warm-wildwood-98145.herokuapp.com/'+doc.productImage

                    }
                })
            };
            console.log(docs);
            if(docs.length>=0){
                res.status(200).json(response);
            }
            else{
                res.status(404).json({
                    message:"No entries found"
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
};

exports.products_create_product=(req,res,next)=>{

    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage:req.file.path
    });
    product
        .save()
        .then(result=>{
            res.status(200).json({
                message:"Created product Succesfully",
                createProduct:{
                    name:result.name,
                    price:result.price,
                    productImage:result.productImage,
                    _id:result._id,
                    request:{
                        type:'GET',
                        url:"https://warm-wildwood-98145.herokuapp.com/products/"+result._id
                    }
                }
            });

        })
        .catch(err=> {
            res.status(500).json({error:err});
            console.log(err)
        });


}

exports.products_get_product=(req,res,next)=>{
    const id=req.params.productId;
    Product.findById(id)
        .select('name price image _id')
        .exec()
        .then(doc=>{
            if(doc){
                res.status(200).json({
                    product:doc,
                    request:{
                        type:'GET',
                        description:"Get all products",
                        url:'https://warm-wildwood-98145.herokuapp.com/products/'
                    }
                });

            }
            else{
                res.status(404).json({
                    message:"not found for provider ID"
                })
            }
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });

}

exports.products_update_product=(req,res,next)=>{
    const id=req.params.productId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.update({_id:id},{$set:updateOps})
        .exec()
        .then(result=>{

            res.status(200).json({
                message:'Product Updated',
                request:{
                    type:'GET',
                    url:'https://warm-wildwood-98145.herokuapp.com/products/'+ id
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

}

exports.products_delete_product=(req,res,next)=>{
    const id=req.params.productId;
    Product.remove({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"product Deleted",
                request:{
                    type:'POST',
                    url:'https://warm-wildwood-98145.herokuapp.com/products/',
                    body:{name:'String',price:'Number',image:'String'}
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        })

}