const Joi = require('@hapi/joi');

module.exports = function(req, res, next) {

  Joi
    .object({
      accountFrom : Joi.number().integer().positive().required(),
      accountTo   : Joi.number().integer().positive().required(),
      value       : Joi.number().integer().positive().required(),
    })
    .validate(req.body, err => {
      if (err) return res.status(422).json(err.details);
      
      return next();
    });
};
