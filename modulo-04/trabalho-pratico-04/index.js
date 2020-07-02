require('dotenv').config();
require('./src/config/db').connect();

const app = require('./src/app');

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${listener.address().port}`);
});
