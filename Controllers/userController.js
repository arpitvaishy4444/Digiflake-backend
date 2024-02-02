const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");


// Register a User 
exports.registerUser = catchAsyncErrors(async(req,res)=>{
    const {name,email,password} = req.body;
    const user = await User.create({name,email,password});
    res.status(201).json({
        success:true,
        message:"User registered successfully"
    })

});
// LOG IN a USER

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("please Enter Email & Password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
    res.status(200).json({
        success:true,
        message:"User LoggedIn Successfully"
    })
});

// Logout a User
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req ,res ,next)=>{

    // creating token hash
    // const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = User.findOne(req.params.id)

    if(!user){
        return next(new ErrorHandler("User not found",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password =  req.body.password;
   
    

    await user.password === req.body.password;
    sendToken(user,200,res);

});



