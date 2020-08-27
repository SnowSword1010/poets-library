//jshint esversion:6

// **************************** BOILERPLATE ************************* //

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

app.use(cors());
app.use(express.json());

// ***************************************************************** //

const commentSchema = mongoose.Schema({
    _poetry_id: Number,
    commenter: String,
    new: String,
    reply: String
})

module.exports = commentSchema;