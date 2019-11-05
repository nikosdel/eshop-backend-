var express=require("express");
var router=express.Router();
const CustomerController=require('../controllers/customer');
const checkAuth=require('../middleware/check-auth');

router.post("/register",CustomerController.customer_register);

router.post("/login",CustomerController.customer_login);

router.delete('/:userId',checkAuth,CustomerController.customer_delete);

router.patch('/:customerId',checkAuth,CustomerController.customer_update);



module.exports=router;