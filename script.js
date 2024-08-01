require("dotenv").config();
const express=require("express");
const app=express();
const path=require("path");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const mongoose=require("mongoose");
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(express.static (path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use('/', require('./routes/routes'));
app.set('view engine', 'hbs');

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(()=>{
    app.listen(3001,()=>{
      console.log("started at 3001");
    })
})



