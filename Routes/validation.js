
//validation
const Joi = require('joi');
const { join } = require('lodash');

//Register validation
const registerValidation = data =>{
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

const signinValidation = data =>{
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    }
};

const postSchema ={
    name: Joi.string()
        .min(3)
        .required(),
    completed: Joi.boolean()
};


module.exports.registerValidation = registerValidation;
module.exports.signinValidation = signinValidation;
module.exports.postValidation = (post) =>Joi.validate(post, postSchema);