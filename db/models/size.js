const Sequelize = require('sequelize');
const db = require('APP/db');

const Size = db.define('sizes', {
    shoulder: {
      type: Sequelize.INTEGER
    },
    bust: {
      type: Sequelize.INTEGER
    },
    waist: {
      type: Sequelize.INTEGER
    }
});

module.exports = Size;
