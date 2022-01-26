
var express = require('express');
const fileUpload = require('express-fileupload')
// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')
const app = express()
app.use(express.json())


app.post('/upload-influencer', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            let name = avatar.name;
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
  });

module.exports = app