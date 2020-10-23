const User = require("../models/user");
require ('dotenv').config()

const user = new User({
    email: "siboniyo@gmail.com",
    password: process.env.PASSWORD,
    name: 'Sibo'
})

user.save()