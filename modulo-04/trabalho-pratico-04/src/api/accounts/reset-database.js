const Account = require('../../models/account');

const DATA = require('../../util/accounts.json');

const resetDatabase = async (req, res, next) => {
  try {

    await Account.collection.remove();
    await Account.create(DATA);

    res.json({
      reset     : 'ok',
      accounts  : await Account.find({})
    });

  } catch (err) {
    next(err);
  }
};

module.exports = resetDatabase;
