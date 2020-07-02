const mongoose = require('mongoose');

const connect = () => {

  mongoose.connect(process.env.ATLAS_CONNECTION_STRING, {
    useNewUrlParser     : true,
    useUnifiedTopology  : true
  });

  mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB Atlas: ${process.env.ATLAS_CONNECTION_STRING}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`Database disconnected from: ${process.env.ATLAS_CONNECTION_STRING}`);
  });

  mongoose.connection.on('error', err => {
    console.log(`Database error on connection: ${err}`);
  });

  process.on('SIGINT', () => {

    mongoose.connection.close(() => {
      console.log('Database disconnected due the end of application');
      process.exit(0);
    });

  });

};

module.exports = {
  connect
};
