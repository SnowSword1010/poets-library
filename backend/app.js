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

const userSchema = require('./user');
const poetSchema = require('./poet');

app.use(cors()); // it enables all cors requests
app.use(express.json());

const userconn = mongoose.createConnection('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
const poetconn = mongoose.createConnection('mongodb://localhost:27017/poetDB', { useNewUrlParser: true, useUnifiedTopology: true });

const User = userconn.model("User", userSchema);
const Poet = poetconn.model("Poet", poetSchema);

// currentSignedUpUser is an object which is used to store information about the user browsing the session currently.
const currentSignedUpUser = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
}

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
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newUser.password = hash
                User.create(newUser)
                    .then(user => {
                        console.log("Successfully saved user to database.");
                        currentSignedUpUser.firstName = user.firstName;
                        currentSignedUpUser.lastName = user.lastName;
                        currentSignedUpUser.email = user.email;
                        currentSignedUpUser.password = user.password;
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
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
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

app.post("/poetprofilecreation", (req, res) => {
    console.log("Posted penname");
    Poet.findOne({
        penName: req.body.penName
    }).then(poet => {
        if (!poet) {
            const newPoet = new Poet({
                penName: req.body.penName,
                fName: currentSignedUpUser.firstName,
                lName: currentSignedUpUser.lastName,
                email: currentSignedUpUser.email
            })
            Poet.create(newPoet)
                .then(poet => {
                    console.log("Poet successfully saved to database.");
                    res.send({
                        poet: poet
                    })
                })

                .catch(err => {
                    console.log(err);
                })
        }
        else {
            console.log("User Name already exits! Try a different one.");
        }
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));