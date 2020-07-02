const { Router }  = require('express');
const router      = Router();

// Controllers
const transferBalance         = require('./transfer-balance');
const transferLargestAccounts = require('./transfer-largest-accounts');

// Validators
const transferValidator = require('./validators/transfer.validator');

router.post('/transfer-balance', [
  transferValidator,
  transferBalance
]);

router.post('/transfer-largest-accounts-agency', [
  transferLargestAccounts
]);

module.exports = router;
