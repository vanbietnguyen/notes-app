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
    // SERVER_URI: 'http://localhost:8080',
    SERVER_URI: 'https://koala-notes-app.herokuapp.com/',
  },
  production: {
    db: {
      host: process.env.DB_HOST,
    },
    SERVER_URI: 'https://koala-notes-app.herokuapp.com/',
  },
};

module.exports = config[process.env.NODE_ENV];