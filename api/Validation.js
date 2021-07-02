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
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    phoneNumber: Joi.string().min(6).required(),
    addressLine1: Joi.string().min(1).required(),
    addressLine2: Joi.string().min(1).required(),
    city: Joi.string().allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().allow(""),
  };
  return Joi.validate(data, schema);
};

const ProductInsertValidation = (data) => {
  const schema = {
    companyId: Joi.string().min(3).allow(""),
    productName: Joi.string().min(1).required(),
    productCode: Joi.string().min(1).required(),
    productImgUrl: Joi.string().allow(""),
    quantity: Joi.number().min(1).required(),
    measuredIn: Joi.string().min(1).required(),
    productCategory: Joi.array().allow("").default([]),
    priceRange: Joi.object().allow("").default({}),
  };
  return Joi.validate(data, schema);
};

const ItemInsertValidation = (data) => {
  const schema = {
    companyId: Joi.string().min(3).allow(""),
    customerName: Joi.string().allow(""),
    items: Joi.array().allow("").default([]),
  };
  return Joi.validate(data, schema);
};

const OrderValidation = (data) => {
  const schema = {
    customerName: Joi.string().min(3).required(),
    numberOfAttendees: Joi.number().min(1).required(),
    selectedEvent: Joi.string().min(3).required(),
    eventDate: Joi.string().min(1).required(),
    eventTime: Joi.string().min(1).required(),
    eventVenue: Joi.string().min(3).required(),
    // ceremoneyName: Joi.string().min(3).required(),

    subEvents: Joi.array().allow("").default([]),
    starterData: Joi.array().allow("").default([]),
    saladData: Joi.array().allow("").default([]),
    soupData: Joi.array().allow("").default([]),
    dessertData: Joi.array().allow("").default([]),
    mainCourseData: Joi.array().allow("").default([]),

    soupCount: Joi.number().allow("").default(0),
    saladCount: Joi.number().allow("").default(0),
    starterCount: Joi.number().allow("").default(0),
    mainCourseCount: Joi.number().allow("").default(0),
    dessertCount: Joi.number().allow("").default(0),

    totalPrice: Joi.number().min(1).required(),

    title: Joi.string().allow(""),
    messageText: Joi.string().allow(""),
  };
  return Joi.validate(data, schema);
};

const TempOrderValidation = (data) => {
  const schema = {
    previewId: Joi.string().min(3).required(),
    customerName: Joi.string().allow(""),
    numberOfAttendees: Joi.number().allow(""),
    selectedEvent: Joi.string().allow(""),
    eventDate: Joi.string().allow(""),
    eventTime: Joi.string().allow(""),
    eventVenue: Joi.string().allow(""),
    subEvents: Joi.array().allow("").default([]),
    starterData: Joi.array().allow("").default([]),
    saladData: Joi.array().allow("").default([]),
    soupData: Joi.array().allow("").default([]),
    dessertData: Joi.array().allow("").default([]),
    mainCourseData: Joi.array().allow("").default([]),
    soupCount: Joi.number().allow("").default(0),
    saladCount: Joi.number().allow("").default(0),
    starterCount: Joi.number().allow("").default(0),
    mainCourseCount: Joi.number().allow("").default(0),
    dessertCount: Joi.number().allow("").default(0),
    totalPrice: Joi.number().allow(""),
    title: Joi.string().allow(""),
    messageText: Joi.string().allow(""),
  };
  return Joi.validate(data, schema);
};

module.exports.ManagerRegistrationValidation = ManagerRegistrationValidation;
module.exports.ManagerLoginValidation = ManagerLoginValidation;
module.exports.EventDetailValidation = EventDetailValidation;
module.exports.CustomerRegistrationValidation = CustomerRegistrationValidation;
module.exports.ProductInsertValidation = ProductInsertValidation;
module.exports.ItemInsertValidation = ItemInsertValidation;
module.exports.OrderValidation = OrderValidation;
module.exports.TempOrderValidation = TempOrderValidation;
