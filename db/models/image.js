const Sequelize = require('sequelize');
const db = require('APP/db');

const Image = db.define('images', {
  path: {
    type: Sequelize.STRING
  }
});

module.exports = Image;
