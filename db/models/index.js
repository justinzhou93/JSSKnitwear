'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const OAuth = require('./oauth');
const CreditCard = require('./creditcard');
const Address = require('./address');
const Product = require('./product');
const Review = require('./review');
const LineItem = require('./lineitem');
const Order = require('./order');
const Color = require('./color');
const Size = require('./size');

// NOTE: added cascade for certain items in order to delete all associated items if it gets deleted
OAuth.belongsTo(User, {onDelete: 'cascade', hooks: true})
User.hasOne(OAuth, {onDelete: 'cascade', hooks: true});
User.hasMany(CreditCard, {onDelete: 'cascade', hooks: true});
User.hasMany(Address, {onDelete: 'cascade', hooks: true});
User.hasMany(Review);
User.hasMany(Order);
User.hasMany(LineItem);
Address.belongsTo(User);
CreditCard.belongsTo(User);
Review.belongsTo(Product);
Product.hasMany(Review, {onDelete: 'cascade', hooks: true});
Product.belongsToMany(Color, {through: 'ProductColors'});
Product.belongsToMany(Size, {through: 'ProductSizes'});
Review.belongsTo(User);
Order.belongsTo(User);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
LineItem.belongsTo(User);
LineItem.belongsTo(Color);
LineItem.belongsTo(Size);
Color.belongsToMany(Product, {through: 'ProductColors'});
Color.hasMany(LineItem);
Size.belongsToMany(Product, {through: 'ProductSizes'});
Size.hasMany(LineItem);

module.exports = {User, CreditCard, Address, Product, Review, LineItem, Order, Color, Size};