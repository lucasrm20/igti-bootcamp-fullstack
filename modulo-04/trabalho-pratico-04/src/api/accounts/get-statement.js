const Account         = require('../../models/account');
const NotFoundError   = require('../../util/not-found.error');

const getStatement = async (req, res, next) => {
  try {

    const { agency: agencia, account: conta } = req.params;

    const account = await Account
      .findOne({
        agencia,
        conta
      }, {
        _id     : 0,
        agencia : 1,
        conta   : 1,
        balance : 1
      });

    if (!account) throw new NotFoundError(`Agency: ${agencia} Account: ${conta} - Not Found`);

    res.json(account);

  } catch (err) {
    next(err);
  }
};

module.exports = getStatement;
