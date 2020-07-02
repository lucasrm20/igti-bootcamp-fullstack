const Account = require('../../models/account');

const NotFoundError             = require('../../util/not-found.error');
const InsufficientBalanceError  = require('../../util/insufficient-balance.error');

const BANK_FEE = 8;

const transfer = async (req, res, next) => {
  try {
    
    const accountFrom = await find(req.body.accountFrom);
    const accountTo = await find(req.body.accountTo);

    const transactionFee = calcTransactionFee(accountFrom, accountTo);
    const tranferValueWithFee = req.body.value + transactionFee;

    if (hasInsufficientBalance(accountFrom, tranferValueWithFee)) throw new InsufficientBalanceError();

    accountFrom.balance -= tranferValueWithFee;
    accountTo.balance += req.body.value;

    await accountFrom.save();
    await accountTo.save();

    res.json({
      agencia : accountFrom.agencia,
      conta   : accountFrom.conta,
      balance : accountFrom.balance
    });

  } catch (err) {
    next(err);
  }
};

const find = async (accountNumber) => {
  const account = await Account.findOne({ conta: accountNumber });

  if (!account) throw new NotFoundError(`Account: ${accountNumber} - Not Found`);

  return account;
}

const calcTransactionFee = (accountFrom, accountTo) => {
  return accountFrom.agencia === accountTo.agencia ? 0 : BANK_FEE;
}

const hasInsufficientBalance = (accountFrom, valueToTransfer) => {
  return accountFrom.balance < valueToTransfer;
}

module.exports = transfer;
