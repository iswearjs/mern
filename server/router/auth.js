const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello World From The Server Router JS`);
});

// using promises

// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Plz Filled The Field Propery" })
//     }

//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email already Exist" })
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(() => {
//             res.status(201).json({ message: "user rigistered successfully" });
//         }).catch((err) => res.status(500).json({ erro: "Failed to registered" }));
//     }).catch(err => { console.log(err); });
// });


// Async-Await
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz Filled The Field Propery" })
    }

    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();

            res.status(201).json({ message: "user rigistered successfully" });
        }

    } catch (err) {
        console.log(err)
    }
});


// login route

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message: "awesome..."});
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Plz Filled the data" });
        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" })
            } else {
                res.json({ message: "User Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" })
        }

    } catch (err) {
        console.log(err);
    }
})

// about us page
router.get('/about', authenticate, (req, res) => {
    console.log(`Hello my about`);
    // res.send(`hello from the about page`);
    res.send(req.rootUser);
});

// get user data fro contact ua and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Hello my contact`);
    // res.send(`hello from the about page`);
    res.send(req.rootUser);
})

// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("Error in contact form");
            return res.json({ error: "plz filled the contact" });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "User Contact Successfully" });
        }
    } catch (error) {
        console.log(error);
    }
})

// Logout page
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    // res.send(`hello from the Logout page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logout');
});

module.exports = router;