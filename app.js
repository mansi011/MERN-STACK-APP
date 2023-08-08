const dotenv=require('dotenv');
const express=require('express');
const http=require('http');

const mongoose=require('mongoose');
const app=express();


dotenv.config({path:'./config.env'});
require('./db/conn.js');

const User=require('./models/userSchema.js');

const PORT=process.env.PORT;



// database connectivity

// const db='mongodb+srv://dbUser:LoTyIe2eI8LiqjIK@cluster1.uhataqc.mongodb.net/mernstack?retryWrites=true&w=majority';

// mongoose.connect(db , {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false


// }).then(() => {
//     console.log(`connection successful`);
// }).catch((err) => console.log(`no connection`));



// middleware

const middleware=(req,res,next)=> {
    console.log(`hello to middleware`);
    next();

}




app.get('/', (req,res) => {
    res.send(`Hello World from the home page`);
});

app.get('/signin', (req,res) => {
    res.send(`Hello World from the login page`);
});

app.get('/signup', (req,res) => {
    res.send(`Hello World from the registration page`); 
});

app.get('/aboutme', middleware, (req,res) => {
    console.log(`hello my about me`);
    res.send(`Hello World from the about me page`);
});

app.get('/contact', (req,res) => {
    res.send(`Hello World from the contact page`);
});

// console.log('Hello')

app.listen(PORT, () => {
    console.log(`Listening at port no. ${PORT}`);
});
