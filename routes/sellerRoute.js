const Order=require('../models/order');
var express=require("express");
const sellerController=require("../controllers/seller");
const router=express.Router();


router.post("/login",sellerController.customer_login);
router.post("/register",sellerController.customer_register);

module.exports=router;