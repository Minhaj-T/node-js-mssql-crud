const Joi = require('../utils/JoiSchema');

exports.validateTodo = (req, res, next) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = Joi.TodoSchema.validate(req.body, options);
  if (error) return res.status(400).send({ error: error.details[0].message });
  next();
};

exports.UserRegiser = (req, res, next) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = Joi.UserSchema.validate(req.body, options);
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
  };
