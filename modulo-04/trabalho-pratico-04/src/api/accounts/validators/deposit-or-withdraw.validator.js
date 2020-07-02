const Joi = require('@hapi/joi');

module.exports = function(req, res, next) {

  Joi
    .object({
      value: Joi.number().integer().positive().required(),
    })
    .validate(req.body, err => {
      if (err) return res.status(422).json(err.details);
      
      return next();
    });
};
