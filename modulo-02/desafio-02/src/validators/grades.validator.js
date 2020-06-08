const Joi = require('@hapi/joi');

module.exports = function(req, res, next) {

  Joi
    .object()
    .keys({
      student : Joi.string().required(),
      subject : Joi.string().required(),
      type    : Joi.string().required(),
      value   : Joi.number().required(),
    })
    .validate(req.body, err => {
      if (err) return res.status(422).json(err.details);
      
      return next();
    });
};
