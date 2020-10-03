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
const quoteconn = mongoose.createConnection('mongodb://localhost:27017/quotesDB', { useNewUrlParser: true, useUnifiedTopology: true });

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

// this piece of code is essential to run the findAndUpdateOne query.
mongoose.set('useFindAndModify', false);


const auth = (req, res, next) => {
    // getting the token out of the header
    // Our header is gonna have two attributes => the first is gonna be a BEARER
    // and the second one is gonna be our TOKEN.
    /* console.log("Reached auth"); */
    const token = req.header("x-auth-token");
    if (!token) {
        console.log("Invalid token");
        return res.status(401);
    }// next would never be executed
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!verified) {
        return res
            .status(401)
            .json({ msg: "Token verification failed, authorisation denied." });
    }
    else {
        req.poet = verified.id;
        next();
    }
};

app.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }
        /* console.log(token); */
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (!verified) {
            return res.json(false);
        }
        const poet = await Poet.findById(verified.id);
        if (!poet) {
            return res.json(false);
        }
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/poets", auth, async (req, res) => {
    /* console.log("Reached /poets block"); */
    const poet = await Poet.findById(req.poet);
    res.json({
        id: poet._id,
        penName: poet.penName,
        fName: poet.fName,
        lName: poet.lName,
        email: poet.email
    });
})

// POSTING ON SIGN UP PAGE
app.post("/signup", function (req, res) {
    // creating a user object based on information entered on the sign up page
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    // checking if the user is already registered on usersDB or not
    User.findOne({
        email: req.body.email
    }).then(user => {
        // If user doesn't exist in usersDB
        if (!user) {
            // hashing the password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newUser.password = hash
                // Creating and saving the new user to usersDB
                User.create(newUser)
                    .then(user => {
                        console.log("Successfully saved user to database.");
                        currentSignedUpUser.firstName = user.firstName;
                        currentSignedUpUser.lastName = user.lastName;
                        currentSignedUpUser.email = user.email;
                        currentSignedUpUser.password = user.password;
                        // Sends the signUp data to frontend
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

// POSTING ON LOGIN PAGE
app.post('/login', async (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // passwords match
                console.log("Logged in");
                // Gets the poet profile corressponding to the user
                Poet.findOne({
                    email: req.body.email
                }).then(poet => {
                    // poet authenticated

                    // JSON web token consists of three parts separated by dots. It looks like xxxxx.yyyyy.zzzzz
                    // 1st part - Header, 2nd part - Payload, 3rd part - Signature

                    // CREATING JSON WEB TOKEN
                    // First parameter => Payload => The thing we want to serialise
                    // Second parameter => Secret Key in order to serialise
                    const token = jwt.sign({ id: poet._id }, process.env.ACCESS_TOKEN_KEY);
                    res.json({
                        token,
                        poet: {
                            id: poet._id, penName: poet.penName,
                            fName: poet.fName,
                            lName: poet.lName,
                            email: poet.email
                        }
                    });
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

app.get("/quote", (req, res) => {
    // Get the count of all quotes
    Quote.countDocuments().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)

        // Again query all users but only fetch one offset by our random #
        Quote.findOne().skip(random).exec(
            function (err, quoteObj) {
                // Tada! random quoteObj
                res.json(quoteObj);
            })
    })
})


app.post("/newpoetry", async (req, res) => {
    Draft.findOneAndUpdate({ penName: req.body.penName })
        .then(draft => {
            if (!draft) {
                Draft.create({ penName: req.body.penName, drafts: [{ draft_id: 1, draft_title: req.body.title, draft_content: req.body.poem }] })
            }

            // Omitting the extre arr varaible results in some sort of error
            const arr = draft.drafts;
            arr.push({ draft_id: arr.length + 1, draft_title: req.body.title, draft_content: req.body.poem });
            console.log(arr);
            draft.drafts = arr;
            draft.save();
        }
        )
        .catch(err => {
            console.log(err);
        })
});

app.post("/mypoetries", async (req, res) => {
    Draft.findOne({ penName: req.body.penName })
        .then(draft => {
            res.send(draft.drafts);
        })
        .catch(err => {
            console.log(err);
        })
})

app.post("/currentLoggedInUser", async (req, res) => {
    console.log(req);
    res.json({ status: "OK" });
})

app.get("/edit/:penName/:draft_id", async (req, res) => {
    console.log(req.params);
    Draft.findOne({ penName: req.params.penName })
        .then(draft => {
            res.json(draft.drafts[req.params.draft_id - 1]);
        })
})

app.post("/update/:penName/:draft_id", async (req, res) => {
    Draft.findOneAndUpdate({ penName: req.body.penName })
        .then(draft => {
            const arr = draft.drafts;
            arr[req.params.draft_id - 1].draft_title = req.body.title;
            arr[req.params.draft_id - 1].draft_content = req.body.poem;
            draft.drafts = arr;
            // This next line is used to save an array
            draft.markModified('drafts');
            draft.save();
        })
})

app.get("/publish/:penName/:draft_id", async (req, res) => {
    console.log(req.params);
    Draft.findOne({ penName: req.params.penName })
        .then(draft => {
            // console.log(draft.drafts[req.params.draft_id - 1]); gives an obj with draft_id, draft_title and draft_content
            // _poetry_id, poetry_title, poetry_content, poet_name
            Published.count({}, function (err, count) {
                const obj = {
                    _poetry_id: count+1,
                    poetry_title: draft.drafts[req.params.draft_id - 1].draft_title,
                    poetry_content: draft.drafts[req.params.draft_id - 1].draft_content,
                    poet_name: req.params.penName
                }
                Published.create(obj);
            })
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/published", async (req, res) => {
    Published.find({})
    .then(publishedDrafts => {
        console.log(publishedDrafts);
        res.send(publishedDrafts);
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));