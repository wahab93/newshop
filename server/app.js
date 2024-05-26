const dotenv = require('dotenv')
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
//  port 
const port = process.env.PORT || 5000;

// app.use(express.static('public'));
app.use('/public' ,express.static('public'))
app.use(cors());
app.use(cookieParser());

// .env for security
dotenv.config({path: './.env'})

// Database Connection
require('./db/conn')

// for data convert into the json
app.use(express.json());

// link Router file
app.use(require('../server/router/auth'))

app.listen(port , ()=>{
    console.log(`server is running at port ${port}`);
})