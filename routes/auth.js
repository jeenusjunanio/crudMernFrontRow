const express = require("express");
const router= express.Router();

// import the controller
const {register,login,forgotpassword,resetpassword, add_influencer}= require("../controllers/auth")

// define the routes to the controller
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotpassword);
router.route("/reset-password/:resetToken").put(resetpassword);
// router.route("/add-influencer").post(add_influencer);

module.exports= router;