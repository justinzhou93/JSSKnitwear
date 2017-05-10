const Sequelize = require('sequelize');
const db = require('APP/db');

const Color = db.define('colors', {
    name: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    }
});

module.exports = Color;
