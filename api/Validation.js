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

    ceremonies: Joi.array().allow(""),
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

const EventDetailValidation = (data) => {
  const schema = {
    companyId: Joi.string().min(3).allow(""),
    customerName: Joi.string().min(3).required(),
    numberOfAttendees: Joi.number().min(1).required(),
    selectedEvent: Joi.string().min(3).required(),
    eventDate: Joi.string().min(1).required(),
    eventTime: Joi.string().min(1).required(),
    eventVenue: Joi.string().min(3).required(),
  };
  return Joi.validate(data, schema);
};

const CustomerRegistrationValidation = (data) => {
  const schema = {
    customerName: Joi.string().min(3).required(),
  };
  return Joi.validate(data, schema);
};

const ProductInsertValidation = (data) =>{
  const schema = {
    companyId: Joi.string().min(3).allow(""),
    productName: Joi.string().min(1).required(),
    productCode: Joi.string().min(1).required(),
    productImgUrl: Joi.string().allow(""),
    quantity: Joi.number().min(1).required(),
    measuredIn: Joi.string().min(1).required(),
    productCategory: Joi.string().min(1).required(),
    priceRange: Joi.object().allow("")
  }
  return Joi.validate(data, schema);
}

module.exports.ManagerRegistrationValidation = ManagerRegistrationValidation;
module.exports.ManagerLoginValidation = ManagerLoginValidation;
module.exports.EventDetailValidation = EventDetailValidation;
module.exports.CustomerRegistrationValidation = CustomerRegistrationValidation;
module.exports.ProductInsertValidation = ProductInsertValidation;