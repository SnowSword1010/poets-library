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
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

// ***************************************************************** //

function quote()
{
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
}
module.exports = quote;