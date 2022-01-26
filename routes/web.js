const express = require("express");
const router= express.Router();

const { index}= require("../controllers/web/influencer")

router.route("/influencers").get(index);
module.exports= router;