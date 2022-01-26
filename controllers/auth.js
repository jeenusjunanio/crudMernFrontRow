// const req = require("express/lib/request");
const User = require("../models/User");
const ErrorResponse= require('../utils/errorResponse');
// we use async if we are going to make db request
exports.register=async(req,res,next) => {
    const {username, email, password}= req.body;

    try {
        const user= await User.create({
            username,
            email,
            password
        });
// remember the password is hashed in model
        // res.status(201).json({
        //     success: true,
        //     token: "123134912jdhj"
        // });

        // refactoring above response with jwt
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async(req,res,next) => {
    const {email, password} = req.body;

    // check if the fileds are not empty
    if (!email || !password) {
        return next(new ErrorResponse("All the fields are required.",400));
    }

    try {
        const user = await User.findOne({email}).select("+password");

        if (!user) {
            // return res.status(401).json({ success: false, error: 'Invalid credentials' });
            return next(new ErrorResponse("Invalid credentials.",401));
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            // return res.status(401).json({ success: false, error: "Invalid credentials" });
            return next(new ErrorResponse("Invalid credentials.",401));
        }

        // res.status(200).json({ success: true, token: "ggsdgdgdjsgdgh" });

        // refactoring above response with jwt
        sendToken(user, 200, res);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.forgotpassword=(req,res,next) => {
    res.send('forgot password route');
};

exports.resetpassword=(req,res,next) => {
    res.send('Reset Password route');
};

exports.add_influencer=(req,res,next) => {
    res.send('Add influencer route');
};

// for the jsonwebtoken

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token});
};