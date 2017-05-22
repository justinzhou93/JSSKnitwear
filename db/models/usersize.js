const Sequelize = require('sequelize');
const db = require('APP/db');

const USize = db.define('userSizes', {
  main: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  shoulder: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  waist: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  bust: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  hip: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  sleeve: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  armCircum: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  },
  jacketLength: {
    type: Sequelize.ENUM('P', 'S', 'M', 'L', 'XL', '1X', '2X', '3X')
  }
});

module.exports = USize;
