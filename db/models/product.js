const Sequelize = require('sequelize');
const db = require('APP/db');


const Product = db.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.STRING
  },
  collection: {
    type: Sequelize.ENUM('Day', 'Evening')
  }
});

module.exports = Product;
