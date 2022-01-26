const Influencer = require("../models/Influencer");
const ErrorResponse= require('../utils/errorResponse');
const fileUpload = require('express-fileupload')
const fs = require('fs');
exports.index=async(req,res,next) => {
    try {
        const influencers = await Influencer.find().select('-password')
       
        res
        .status(200)
        .json({success: true,influencers});
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
};

exports.addInfluencer=async(req,res,next) => {
    const {influencername, email, password, images, gender, country, instaUrl, fbUrl} = req.body;
    try {

        const influencer = await Influencer.create({
            influencername,
            email,
            password,
            images,
            gender,
            country,
            instaUrl,
            fbUrl
        });

        res.status(201).json({success: true,influencer});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editInfluencer=async(req,res,next) => {

    let user_id = req.params.id;
    if (user_id =='') {
        return next(new ErrorResponse("Bad request method", 401));
    }
    try {
        const influencer = await Influencer.findById({_id : user_id}).select("-password");

        if (!influencer) {
            return next(new ErrorResponse("User not found", 404));
        }
        res
        .status(200)
        .json({
        success: true,
        influencer,
        });
    } catch (error) {
        return next(new ErrorResponse(error.message,500));
    }
    
};

exports.viewInfluencer=async(req,res,next) => {
    res
    .status(200)
    .json({
      success: true,
      data: "You got access to the influencer view area",
    });
};

exports.updateInfluencer=async(req,res,next) => {

    let user_id = req.params.id;
    if (user_id =='') {
        return next(new ErrorResponse("Bad request method", 401));
    }
    const {influencername, email, password, images, gender, country, instaUrl, fbUrl} = req.body;
    try {
        const influencer = await Influencer.findOneAndUpdate({_id : user_id},{
            influencername,
            email,
            password,
            images,
            gender,
            country,
            instaUrl,
            fbUrl
        });

        res.status(201).json({success: true,influencer});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteInfluencer=async(req,res,next) => {
    try {
        const influencer = await Influencer.findByIdAndDelete(req.params.id);

        if (!influencer) {
            return next(new ErrorResponse("User not found", 404));
        }
        res.status(200).json({success: true,influencer});
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
};

exports.uploadInfluencer=async(req,res,next) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            let name = new Date().getTime() +'_'+avatar.name;
            name = name.replace(/\s/g, "")
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./client/public/influencer/' + name);
  
  
            //send response
            // res.json({ avatar: `public/${req.body.filename}.png` });
            // console.log(res.json);
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                  URL:'/influencer/' + name,
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.destroyImage=async(req,res,next) => {
    if (!req.body.images) {
        return next(new ErrorResponse("no image is attached", 404));
    }
    try {
        // return res.status(200).send('./client/public' +req.body.images);
        if (fs.existsSync('./client/public' +req.body.images)) {
            fs.unlinkSync('./client/public' +req.body.images);
            return res.status(200).send('Successfully! Image has been Deleted');
        }
        
        
        return res.status(200).send('no image found. You shall update new file');
      } catch (err) {
        // handle the error
        return res.status(400).send(err);
      }
    
};