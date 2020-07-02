const Account         = require('../../models/account');
const NotFoundError   = require('../../util/not-found.error');

const removeAccount = async (req, res, next) => {
  try {

    const { agency: agencia, account: conta } = req.params;

    const accountExists = await Account.exists({ agencia, conta });

    if (!accountExists) throw new NotFoundError(`Agency: ${agencia} Account: ${conta} - Not Found`);

    await Account.findOneAndRemove({ agencia, conta });

    const activeAccounts = await Account.countDocuments({ agencia });

    res.json({ activeAccounts });

  } catch (err) {
    next(err);
  }
};

module.exports = removeAccount;
