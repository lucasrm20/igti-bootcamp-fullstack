const Joi = require('@hapi/joi');

module.exports = function(req, res, next) {

  Joi
    .object({
      limit : Joi.number().integer().positive(),
      sort  : Joi.string().valid([
        'asc',
        'desc'
      ])
    })
    .validate(req.query, err => {
      if (err) return res.status(422).json(err.details);
      
      return next();
    });
};
