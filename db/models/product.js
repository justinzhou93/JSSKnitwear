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
  imgUrl: {
    type: Sequelize.STRING
  },
  tag: {
    type: Sequelize.ENUM('day', 'evening')
  }
});

module.exports = Product;
