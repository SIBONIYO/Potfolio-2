
//validation
const Joi = require('joi');

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
}

module.exports.registerValidation = registerValidation;
module.exports.signinValidation = signinValidation;