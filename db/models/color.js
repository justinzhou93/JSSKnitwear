const Sequelize = require('sequelize');
const db = require('APP/db');

const Color = db.define('colors', {
    color: {
      type: Sequelize.STRING
    }
});

module.exports = Color;
