const { request } = require('express');
const { string } = require('joi');
const mongoose = require ('mongoose');

const PostCommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: True,
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

module.exports = mongoose.model('postComment', PostCommentSchema);