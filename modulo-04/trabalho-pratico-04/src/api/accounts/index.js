const { Router }  = require('express');
const router      = Router();

// Controllers
const getStatement  = require('./get-statement');
const deposit       = require('./deposit');
const withdraw      = require('./withdraw');
const removeAccount = require('./remove-account');
const resetDatabase = require('./reset-database');

// Validators
const agencyAndAccountValidator   = require('./validators/agency-and-account.validator');
const depositOrWithdrawValidator  = require('./validators/deposit-or-withdraw.validator');

router.get('/:agency/:account', [
  agencyAndAccountValidator,
  getStatement
]);

router.delete('/:agency/:account', [
  agencyAndAccountValidator,
  removeAccount
]);

router.post('/:agency/:account/deposit', [
  agencyAndAccountValidator,
  depositOrWithdrawValidator,
  deposit
]);

router.post('/:agency/:account/withdraw', [
  agencyAndAccountValidator,
  depositOrWithdrawValidator,
  withdraw
]);

router.post('/reset-database', [
  resetDatabase
]);

module.exports = router;
