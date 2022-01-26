
const Influencer = require("../../models/Influencer");
const ErrorResponse= require('../../utils/errorResponse');
exports.index = async(req, res, next) => {

    const influencer = await Influencer.find().select("-password");
    res
      .status(200)
      .json({
        success: true,
        data: influencer,
      });
  };