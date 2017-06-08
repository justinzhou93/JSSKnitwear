const Sequelize = require('sequelize');
const db = require('APP/db');


const Tag = db.define('tags', {
  tag: {
    type: Sequelize.STRING
  }
});

module.exports = Tag;
