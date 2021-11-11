const dotenv = require('dotenv');
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
  },
  development: {
    db: {
      host: process.env.DB_HOST,
    },
    SERVER_URI: 'localhost:5000'
  },
  production: {
    db: {
      host: process.env.DB_HOST,
    },
    SERVER_URI: 'HEROKU_URI',
  },
};

module.exports = config[process.env.NODE_ENV];