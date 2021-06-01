const Joi = require("@hapi/joi");

const ManagerRegistrationValidation = (data) => {
  // const schema = {
  //   firstName: Joi.string().min(3).required(),
  //   lastName: Joi.string().allow(""),
  //   email: Joi.string().min(6).required().email(),
  //   password: Joi.string().min(6).required(),
  // };

  const schema = {
    companyName: Joi.string().min(3).required(),
    ownerFirstName: Joi.string().min(3).required(),
    ownerLastName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    phoneNumber: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),

    whatsappBusinessNumber: Joi.string().allow(""),
    fbPageUrl: Joi.string().allow(""),
    instagramPageUrl: Joi.string().allow(""),
    linkedinPageUrl: Joi.string().allow(""),
    twitterPageUrl: Joi.string().allow(""),
    youtubePageUrl: Joi.string().allow(""),
    
    gstNumber: Joi.string().allow(""),
    refNumber: Joi.string().allow(""),
    businessStartDate: Joi.string().allow(""),
    address: Joi.string().allow(""),
    city: Joi.string().allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().allow(""),
    pinCode: Joi.string().allow(""),

    ceremonies: Joi.array().allow("")
  }

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
