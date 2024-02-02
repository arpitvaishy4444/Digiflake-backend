const Product = require("../models/ProductModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// Create Product
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.create(req.body);
    res.status(200).json({success:true,product});
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        products,
    })
})

// Update Product
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        message:"Product Updated Successfully"
    })

});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404))
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
})
