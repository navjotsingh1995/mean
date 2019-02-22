const express = require ('express');
const path = require('path');
const bodyParser= require('body-parser');
const cors= require('cors');
const passport= require('passport');
const mongoose = require('mongoose');
const config= require('./config/database');



const app= express();

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('connect to database',config.database);
})

mongoose.connection.on('error', ()=>{
    console.log('error',error);
})

const users= require('./routes/users');
//cors mddleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));




//body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//index route
app.get('/',(req,res)=>{
    res.send("testing")
});


//start server
app.listen(3000 , ()=>{
    console.log("server running on port 3000");
    
})


