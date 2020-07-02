const { Router }  = require('express');
const router      = Router();

// Controllers
const getBalanceAverage = require('./get-balance-average');
const getBalanceRanking = require('./get-balance-ranking');

// Validators
const agencyValidator         = require('./validators/agency.validator');
const balanceRankingValidator = require('./validators/balance-ranking.validator');

router.get('/balance-average/:agency', [
  agencyValidator,
  getBalanceAverage
]);

router.get('/balance-ranking', [
  balanceRankingValidator,
  getBalanceRanking
]);

module.exports = router;
