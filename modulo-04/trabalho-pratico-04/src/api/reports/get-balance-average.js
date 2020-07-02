const Account       = require('../../models/account');
const NotFoundError = require('../../util/not-found.error');

const getBalanceAverage = async (req, res, next) => {
  try {

    const [averageBalance] = await Account.aggregate([
      {
        '$match': {
          'agencia': Number(req.params.agency)
        }
      }, {
        '$group': {
          '_id': '$agencia', 
          'averageBalance': {
            '$avg': '$balance'
          }
        }
      }, {
        '$project': {
          '_id': 0, 
          'averageBalance': 1
        }
      }
    ]);

    if (!averageBalance) throw new NotFoundError(`No data found for agency ${req.params.agency} - Not Found`);
    
    res.json(averageBalance);

  } catch (err) {
    next(err);
  }
};

module.exports = getBalanceAverage;
