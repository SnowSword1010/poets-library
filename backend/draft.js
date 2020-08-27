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

const draftSchema = mongoose.Schema({
    penName: String,
    drafts:
    {
        _draft_id: Number,
        draft_title: String,
        draft_content: String
    }
})

module.exports = draftSchema;