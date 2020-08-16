//jshint esversion:6
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios');
const cors = require('cors');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt');

app.use(cors()); // it enables all cors requests
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    data: Array
};

const User = new mongoose.model("User", userSchema);

app.post("/signup", function (req, res) {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        data: []
    });
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newUser.password = hash
                User.create(newUser)
                .then(user => {
                    console.log("Successfully saved user to database.");
                    res.send({
                        isSignedUp: true,
                        userObj: user
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
        else {
            console.log("User already exists");
        }
    }).catch(err => console.log(err));
});

app.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then(user => {
        if(user) {
            if (bcrypt.compareSync(req.body.password, user.password)){
                // passwords match
                console.log("Logged in");
                res.send({
                    isLoggedIn: true,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    data: user.data
                    //userObj: user
                })
            }
            else {
                console.log("The password is incorrect");
            }
        }
        else {
            console.log("User does not exist!");
        }
    })
}
);

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/login', (req, res) => console.log("Namaste"));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));