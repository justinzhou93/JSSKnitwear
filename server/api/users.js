'use strict'; // eslint-disable-line semi camelcase

const db = require('APP/db')
const express = require('express');
const router = express.Router();

const User = db.model('users')
const Address = db.model('addresses');
const CreditCard = db.model('credit_cards');
const Review = db.model('reviews');
const Order = db.model('orders');
const LineItem = db.model('lineitems');
const Product = db.model('products');
const Color = db.model('colors');
const Size = db.model('sizes');
const Image = db.model('images');
const USize = db.model('userSizes');

// NOTE: this is for admin use only
router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => res.json(users))
  .catch(next);
});

// finding details of specific user (for user profile page)
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, {
      include: [
        {model: Address},
        {model: CreditCard},
        {model: Review},
        {model: USize},
        {model: Order, include: [
          {model: LineItem, include: [
            {model: Product, include: [
              {model: Image}
            ]},
            {model: Color},
            {model: Size}
          ]}
        ]}
      ]
    })
    .then(foundUser => {
      res.json(foundUser);
    })
    .catch(next);
});

// gets all user addresses
router.get('/:userId/address', (req, res, next) => {
  Address.findAll({
    where: {
      user_id: req.params.userId
    }
  })
    .then((foundAddresses) => {
      res.json(foundAddresses);
    })
    .catch(next);
});

// adds a new user address
router.post('/:userId/address', (req, res, next) => {
  User.findById(req.params.userId)
    .then(foundUser => {
      return Address.create(req.body)
        .then(createdAddress => {
            return createdAddress.setUser(foundUser);
        })
    })
    .then(updatedAddress => {
      res.json(updatedAddress);
    })
    .catch(next);
});

// updates an address
router.put('/:userId/address/:addressId', (req, res, next) => {
  Address.findById(req.params.addressId)
  .then(foundAddress => {
    return foundAddress.update(req.body)
  })
  .then(updatedAddress => res.status(201).json(updatedAddress))
  .catch(next)
})

// deletes address
router.delete('/:userId/address/:addressId', (req, res, next) => {
  Address.findById(req.params.addressId)
  .then(foundAddress => foundAddress.destroy())
  .then(() => res.redirect(204, '/'))
})

// gets all user credit credit_cards
router.get('/:userId/creditcard', (req, res, next) => {
  CreditCard.findAll({
    where: {
      user_id: req.params.userId
    }
  })
    .then((foundCreditCards) => {
      res.json(foundCreditCards);
    })
    .catch(next);
});

// adds a new user creditcard
router.post('/:userId/creditcard', (req, res, next) => {
  User.findById(req.params.userId)
    .then(foundUser => {
      return CreditCard.create(req.body)
        .then(createdCreditCard => {
          return createdCreditCard.setUser(foundUser);
        })
    })
    .then(updatedCreditCard => {
      res.json(updatedCreditCard);
    })
    .catch(next);
});

// updates card
router.put('/:userId/creditcard/:cardId', (req, res, next) => {
  CreditCard.findById(req.params.cardId)
  .then(foundCard => {
    return foundCard.update(req.body)
  })
  .then(updatedCard => res.status(201).json(updatedCard))
  .catch(next)
})

// deletes card
router.delete('/:userId/creditcard/:cardId', (req, res, next) => {
  CreditCard.findById(req.params.cardId)
  .then(foundCard => foundCard.destroy())
  .then(() => res.redirect(204, '/'))
})

/** --------------------------USER CART----------------------- */
// get user's cart info
router.get('/:userId/cart', (req, res, next) => {
    LineItem.findAll({
      where: {
        user_id: req.params.userId,
        status: 'Cart'
      },
      include: [
        {model: Product, include: [
          {model: Image}
        ]},
        {model: Color},
        {model: Size}
      ]
    })
    .then(foundCart => {
      res.json(foundCart);
    })
    .catch(next);
});

// user adding product to cart
router.post('/:userId/cart/:productId', (req, res, next) => {
  var multiplier = 1;
  var extra = ['XL', '1X', '2X', '3X'];
  if (extra.includes(req.body.size)) {
    multiplier = 1.5;
  }
  if (Object.values(req.body.adjustments).some(adjustment => extra.includes(adjustment))){
    multiplier = 1.5;
  }
  LineItem.create({
    quantity: req.body.quantity,
    user_id: req.params.userId,
    product_id: req.params.productId,
    price: req.body.price * multiplier,
    color_id: req.body.color.id,
    status: 'Cart'
  })
    .then(createdCartItem => {
      Size.create({
        main: req.body.size,
        shoulder: (req.body.adjustments.shoulder !== 'default') ? req.body.adjustments.shoulder : undefined,
        waist: (req.body.adjustments.waist !== 'default') ? req.body.adjustments.waist : undefined,
        bust: (req.body.adjustments.bust !== 'default') ? req.body.adjustments.bust : undefined,
        hip: (req.body.adjustments.hip !== 'default') ? req.body.adjustments.hip : undefined,
        sleeve: (req.body.adjustments.sleeve !== 'default') ? req.body.adjustments.sleeve : undefined,
        armCircum: (req.body.adjustments.armCircum !== 'default') ? req.body.adjustments.armCircum : undefined,
        jacketLength: (req.body.adjustments.jacketLength !== 'default') ? req.body.adjustments.jacketLength : undefined
      })
      .then(createdSize => {
        createdCartItem.setSize(createdSize)
        .then(() => {
          res.status(201).json(createdCartItem);
        })
      })
    })
    .catch(next);
});

// when changing quantity of cart
router.put('/:userId/cart/:productId', (req, res, next) => {
  LineItem.findOne({
    where: {
      quantity: req.body.quantity,
      user_id: req.params.userId,
      product_id: req.params.productId,
      price: req.body.price,
      status: 'Cart'
    }
  })
    .then(foundCart => {
      return foundCart.update(req.body)
    })
    .then(updatedCart => {
      res.json(updatedCart);
    })
    .catch(next);
});

// removing item from cart
router.delete('/:userId/cart/:LineItemId', (req, res, next) => {
  LineItem.destroy({
    where: {
      user_id: req.params.userId,
      id: req.params.LineItemId,
      status: 'Cart'
    }
  })
    .then(() => {
      res.send('Item successfully removed from cart!');
    })
    .catch(next);
});
/** --------------------- USER PURCHASING CART ------------------- */

// user purchases an order (from cart)
router.post('/:userId/orders', (req, res, next) => {
  LineItem.purchase(req.params.userId)
    .then(order => res.status(201).send(order))
    .catch(next);
});

/** ------------------------- USER SIZES ------------------------- */

router.post('/:userId/usersizes', (req, res, next) => {
  USize.create(req.body)
  .then(usersize => {
    User.findById(req.params.userId)
    .then(user => usersize.setUser(user))
  })
  .catch(next);
});

router.put('/:userId/usersizes', (req, res, next) => {
  USize.update(req.body)
  .then(updatedSize => res.send(updatedSize))
  .catch(next);
})

router.delete('/:userId/usersizes/:userSizeId', (req, res, next) => {
  USize.findById(req.params.userSizeId)
  .then(foundsize => foundsize.destroy())
  .then(() => res.redirect(204, '/'))
});

module.exports = router;
