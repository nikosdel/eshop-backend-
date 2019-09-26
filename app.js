var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var customer=require("./models/customer");
var product=require("./models/product");
var order=require("./models/order");
var seller=require("./models/seller");
const mongoose=require('mongoose');

app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methos', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.get("/",function (req,res) {
    res.send("server works");
});
const uri="mongodb+srv://admin:admin@cluster0-c2jkj.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser:true});
var customerRoute=require("./routes/customerRoute");
var productRoute=require("./routes/productRoute");
var orderRoute=require("./routes/orderRoute");

app.use("/",customerRoute);
app.use("/products",productRoute);
app.use("/orders",orderRoute);

app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
});

app.listen(process.env.PORT,process.env.IP);