const Account         = require('../../models/account');
const NotFoundError   = require('../../util/not-found.error');

const deposit = async (req, res, next) => {
  try {

    const { agency: agencia, account: conta } = req.params;

    const account = await Account.findOne({ agencia, conta });

    if (!account) throw new NotFoundError(`Agency: ${agencia} Account: ${conta} - Not Found`);

    account.balance += req.body.value;

    await account.save();

    res.json({
      agencia : account.agencia,
      conta   : account.conta,
      balance : account.balance
    });

  } catch (err) {
    next(err);
  }
};

module.exports = deposit;
