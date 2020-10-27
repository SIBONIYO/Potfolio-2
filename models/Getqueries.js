const { request } = require('express');
const { string } = require('joi');
const mongoose = require ('mongoose');

const getquerySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Getqueries', getquerySchema);