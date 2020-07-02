const Account = require('../../models/account');

const PRIVATE_AGENCY = 99;

const transfer = async (req, res, next) => {
  try {

    const accountsToTransfer = await getLargestBalanceAccounts();
    
    const promises = accountsToTransfer.map(account => {
      return Account.findOneAndUpdate({
        _id: account._id
      }, {
        $set: {
          agencia: PRIVATE_AGENCY
        }
      });
    });

    await Promise.all(promises);

    const privateAgencyClients = await Account.find({ agencia: PRIVATE_AGENCY });

    res.json(privateAgencyClients);

  } catch (err) {
    next(err);
  }
};

const getLargestBalanceAccounts = () => {
  return Account.aggregate([
    {
      '$match': {
        'agencia': {
          '$ne': 99
        }
      }
    }, {
      '$sort': {
        'balance': -1
      }
    }, {
      '$group': {
        '_id': '$agencia', 
        'accounts': {
          '$push': '$$ROOT'
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'agency': '$_id', 
        'largestBalanceAccount': {
          '$arrayElemAt': [
            '$accounts', 0
          ]
        }
      }
    }, {
      '$project': {
        '_id': '$largestBalanceAccount._id'
      }
    }
  ]);
}

module.exports = transfer;
