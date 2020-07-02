const Joi = require('@hapi/joi');

module.exports = function(req, res, next) {

  Joi
    .object({
      agency  : Joi.number().integer().positive().required(),
      account : Joi.number().integer().positive().required()
    })
    .validate(req.params, err => {
      if (err) return res.status(422).json(err.details);
      
      return next();
    });
};
