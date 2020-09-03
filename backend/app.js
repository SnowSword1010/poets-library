//jshint esversion:6
require('dotenv').config();
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
const jwt = require('jsonwebtoken');

// REQUIRING DATABASE SCHEMAS
const userSchema = require('./user');
const poetSchema = require('./poet');
const draftSchema = require('./draft');
const publishedSchema = require("./published");
const commentSchema = require('./comment');
const quoteSchema = require('./quote');

app.use(cors()); // it enables all cors requests
app.use(express.json()); // lets our app use json from the body that gets passed upto it inside of the request

// MAKING CONNECTIONS TO DATABASES
// mongoose.connect allows us to connect to only one database on our program. But since, we are working with
// multiple databases, a mongoose method called createConnection is used to simplify our work.
const userconn = mongoose.createConnection('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
const poetconn = mongoose.createConnection('mongodb://localhost:27017/poetDB', { useNewUrlParser: true, useUnifiedTopology: true });
const draftconn = mongoose.createConnection('mongodb://localhost:27017/draftDB', { useNewUrlParser: true, useUnifiedTopology: true });
const publishedconn = mongoose.createConnection('mongodb://localhost:27017/publishedDB', { useNewUrlParser: true, useUnifiedTopology: true });
const commentconn = mongoose.createConnection('mongodb://localhost:27017/commentDB', { useNewUrlParser: true, useUnifiedTopology: true });
const quoteconn = mongoose.createConnection('mongodb://localhost:27017/quoteDB', { useNewUrlParser: true, useUnifiedTopology: true });

// MAKING MODELS FROM SCHEMAS DATABASE SCHEMAS OBTAINED
const User = userconn.model("User", userSchema);
const Poet = poetconn.model("Poet", poetSchema);
const Draft = draftconn.model("Draft", draftSchema);
const Published = publishedconn.model("Published", publishedSchema);
const Comment = commentconn.model("Comment", commentSchema);
const Quote = quoteconn.model("Quote", quoteSchema);

// currentSignedUpUser is an object which is used to store information about the user browsing the session currently.
const currentSignedUpUser = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
}

function authenticateToken(req,res,next){
    // Our header is gonna have two attributes => the first is gonna be a BEARER
    // and the second one is gonna be our TOKEN.
    const authHeader = req.headers['authorization']
    // This line says that if we have an authHeader then we'll return the authHeader
    // token portion, otherwise we are gonna return undefined.
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    // user token is valid but not authorised
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, poet) => {
        if(err) return res.sendStatus(403)
        // our token is valid
        req.poet = poet;
        next();
    })
}

app.post("/signup", function (req, res) {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
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
                let poetInfo;
                Poet.findOne({
                    email: req.body.email
                }).then(poet => {
                    const poetInfo = {
                        isLoggedIn: true,
                        penName: poet.penName,
                        fName: poet.fName,
                        lName: poet.lName,
                        email: poet.email,
                    }
                    // user authenticated
                    // CREATING JSON WEB TOKEN
                    // First parameter => Payload => The thing we want to serialise
                    // Second parameter => Secret Key in order to serialise
                    const accessToken = jwt.sign(JSON.stringify(poetInfo), process.env.ACCESS_TOKEN_KEY);
                    res.json({ accessToken: accessToken, poetInfo:poetInfo });
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

app.get("/login", authenticateToken, (req,res) => {
    console.log(req);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));