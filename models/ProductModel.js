const mongooose = require("mongoose");

const productSchema = new mongooose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Product Name"],
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    status:{
        type:String,
        default:"inactive"
    },
    stock:{
        type:Number,
        default:0
    }
},{timestamps:true});

const Product = new mongooose.model("Product",productSchema);

module.exports = Product;