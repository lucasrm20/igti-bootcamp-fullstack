const express   = require('express');
const morgan    = require('morgan');

const errorHandlers = require('./util/error-handlers');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/accounts', require('./api/accounts'));
app.use('/transfers', require('./api/transfers'));
app.use('/reports', require('./api/reports'));

app.use(errorHandlers.handler404);
app.use(errorHandlers.handler500);

module.exports = app;
