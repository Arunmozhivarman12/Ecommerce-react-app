const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes');
const bp = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const URL = process.env.CONNECTION_URL;

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
    console.log("connected")
}).catch(
   (error) => {console.log(error)}
);



app.use(express.json());
app.use(cors());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));




app.use('/',router)


app.listen(8000,() => {
    console.log("app running")
})