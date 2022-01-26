const express = require("express");
const router= express.Router();

const { adminDashboard}= require("../controllers/admin")
const { index, addInfluencer, editInfluencer, viewInfluencer, updateInfluencer, deleteInfluencer, uploadInfluencer, destroyImage}= require("../controllers/influencer")
const { protect}= require("../middleware/auth")
// const {uploadInfluencer} =require("./upload")

router.route("/dashboard").get(protect, adminDashboard);

// for the influencer CRUD
router.route("/influencers").get(protect, index);
router.route("/add-influencer").post(protect, addInfluencer);
router.route("/edit-influencer/:id").get(protect, editInfluencer);
router.route("/influencer/:id").get(protect, viewInfluencer);
router.route("/update-influencer/:id").put(protect, updateInfluencer);
router.route("/delete-influencer/:id").get(protect, deleteInfluencer);
router.route("/upload-influencer").post(protect, uploadInfluencer);
router.route("/destroyImage").post(protect, destroyImage);

module.exports= router;