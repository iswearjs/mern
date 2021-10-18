const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our router easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// middleware

// const middleware = (req, res, next) =>{
// console.log(`Hello my middleware`)
// next();
// }

// app.get('/', (req, res) => {
//     res.send(`hello from the server`);
// })

// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my about`);
//     res.send(`hello from the about page`);
// })

// app.get('/contact', (req, res) => {
//     // res.cookie("Test", 'ishwar');
//     res.send(`hello from the contact page`);
// })

app.get('/signin', (req, res) => {
    res.send(`hello from the signin page`);
})

app.get('/signup', (req, res) => {
    res.send(`hello from the signup page`);
})

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})