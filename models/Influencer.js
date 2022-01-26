const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const InfluencerSchema = new mongoose.Schema({
    influencername: {
      type: String,
      required: [true, "Please provide username"],
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      sparse:true,
    },
    password: {
      type: String,
      select: false,
    },
    images:{
        type: String
    },
    gender:{
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    instaUrl: {
        type: String,
       
    },
    fbUrl: {
        type: String,
       
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });


//   hash password
InfluencerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    if (this.password =="") {
        next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  const Influencer= mongoose.model("Influencer", InfluencerSchema);

module.exports=Influencer;