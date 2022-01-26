require('dotenv').config({path:"./config.env"});
const express = require("express");
const mongoose= require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));
// this above json function is used to tell the requests are in json and in our controller the request has to be extracted from the body
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/', require('./routes/web'));
// app.use('/api/upload', require('./routes/upload'));

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

// error handler must be the last of all the routes and middleware

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>{
    console.log('Server is running on port', PORT);
})

process.on('unhandledRejection', (err, promise) => {
    console.log('Logged error:', err);
    server.close(() => process.exit(1));
})