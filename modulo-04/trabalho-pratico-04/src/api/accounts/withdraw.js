const Account = require('../../models/account');

const NotFoundError             = require('../../util/not-found.error');
const InsufficientBalanceError  = require('../../util/insufficient-balance.error');

const BANK_FEE = 1;

const withdraw = async (req, res, next) => {
  try {

    const { agency: agencia, account: conta } = req.params;
    const withdrawValue = req.body.value + BANK_FEE;

    const account = await Account.findOne({ agencia, conta });

    if (!account) throw new NotFoundError(`Agency: ${agencia} Account: ${conta} - Not Found`);
    
    if (hasInsufficientBalance(account, withdrawValue)) throw new InsufficientBalanceError();

    account.balance -= withdrawValue;

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

const hasInsufficientBalance = (account, withdrawValue) => {
  return account.balance < withdrawValue;
}

module.exports = withdraw;
