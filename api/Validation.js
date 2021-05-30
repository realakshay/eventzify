const Joi = require("@hapi/joi");

const ManagerRegistrationValidation = (data) => {
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

const ManagerLoginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};
module.exports.ManagerRegistrationValidation = ManagerRegistrationValidation;
module.exports.ManagerLoginValidation = ManagerLoginValidation;
