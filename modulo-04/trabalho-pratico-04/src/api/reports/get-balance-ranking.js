const Account       = require('../../models/account');

const SORT_ORDER = {
  asc   : 1,
  desc  : -1
};

const getLowestBalances = async (req, res, next) => {
  try {

    const limit = Number(req.query.limit) || 50;
    const sort = req.query.sort || 'asc';

    const accounts = await Account
      .find({}, {
        _id     : 0,
        agencia : 1,
        conta   : 1,
        balance : 1
      })
      .sort({ balance: SORT_ORDER[sort] })
      .limit(limit);
    
    res.json(accounts);

  } catch (err) {
    next(err);
  }
};

module.exports = getLowestBalances;
