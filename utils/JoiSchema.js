const Joi = require('joi');
exports.TodoSchema = Joi.object({
  text: Joi.string().min(6).max(12).required(),
});

exports.UserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email(),
  password: Joi.number().required(),
});
