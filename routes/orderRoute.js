const express=require("express");
const router=express.Router()
const checkAuth=require('../middleware/check-auth');

const OrdersCOntroller =require('../controllers/orders');
router.get("/",checkAuth,OrdersCOntroller.orders_get_all);

router.post("/",checkAuth,OrdersCOntroller.make_new_order);

router.get("/:orderId",checkAuth,OrdersCOntroller.orders_get_order);

router.delete("/:orderId",checkAuth,OrdersCOntroller.orders_delete_order);

router.get("/:customerId",checkAuth,OrdersCOntroller.get_user_orders);

module.exports=router;