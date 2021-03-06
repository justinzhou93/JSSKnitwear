const router = require('express').Router();
const Promise = require('bluebird');
const Product = require('../../db/models/product');
const Review = require('../../db/models/review');
const User = require('../../db/models/user');
const Image = require('../../db/models/image');
const Tag = require('../../db/models/tag');

router.param('id', (req, res, next, id) => {
    Product.findOne({
        where: {
            id: id
        },
        include: [
            {model: Review},
            {model: Image, as: 'images'}
        ]
    })
    .then(product => {
        if (!product) {
            const err = new Error('does not exist');
            err.status = 404;
            next(err);
        } else {
            req.requestedProduct = product;
            next()
        }
    })
})

// find all products in the database, with respective reviews
router.get('/', (req, res, next) => {
    Product.findAll({
        include: [
            {model: Review, as: 'reviews'},
            {model: Image, as: 'images'}
        ]
    })
    .then(products => res.json(products))
    .catch(next);
})

// get product by id
router.get('/:id', (req, res, next) => {
    res.json(req.requestedProduct);
})

// ADMIN: post new product
router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then((createdProduct) => {
      Promise.all(req.body.images.map(image => Image.create({path: image})))
      .then(images => {
        Promise.all(images.map(newImage => newImage.setProduct(createdProduct)))
        .then(() => {
          Promise.all(req.body.tags.split(',').map(tag => Tag.create({tag: tag})))
          .then(tags => {
            Promise.all(tags.map(newTag => newTag.setProduct(createdProduct)))
            .then(() => res.json(createdProduct));
          })
        })
      })
    })
    .catch(next)
})

// ADMIN: update product, for price, etc.
// recommend destroy and recreate
router.put('/:id', (req, res, next) => {
    req.requestedProduct.update(req.body)
    .then((updatedProduct) =>
      // NOTE: this step might be slow, since searching all images might take forever
      Promise.all(req.body.images.map(image => Image.create({path: image})))
      .then(images =>
        Promise.all(images.map(newImage => newImage.setProduct(updatedProduct)))
        .then(() => {
          Promise.all(req.body.tags.split(',').map(tag => Tag.create({tag: tag})))
          .then(tags => {
            Promise.all(tags.map(newTag => newTag.setProduct(updatedProduct)))
            .then(() => res.json(updatedProduct));
          })
        })
      )
    )
    .catch(next);
})

// ADMIN: remove product --> should rarely happen, but just in case...
router.delete('/:id', (req, res, next) => {
    req.requestedProduct.destroy()
    .then(() => res.redirect(204, '/'))
})

/** --------------------- IMAGES -------------------- */

router.delete('/:id/images/:imageId', (req, res, next) => {
  Image.findById(req.params.imageId)
  .then(foundImage => foundImage.destroy())
  .then(() => res.redirect(204, '/'))
})

/** --------------------- REVIEWS ------------------- */

// NOTE: only POST/PUT/DELETE. Eagerly Loaded, so don't need GET.
router.post('/:id/reviews', (req, res, next) => {
    var currentUser = User.findOne({where: {id: req.body.userid}})
    var currentReview = Review.create(req.body)
    Promise.all([currentUser, currentReview])
    .spread((user, newReview) => {
      var userAssociation = newReview.setUser(user);
      var productAssociation = newReview.setProduct(req.requestedProduct);
        return Promise.all([userAssociation, productAssociation]);
    })
    .then(() => {
        res.sendStatus(201);
    })
    .catch(next)
})

// update individual reviews
router.put('/:id/reviews/:reviewId', (req, res, next) => {
    Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(updatedReview => res.status(201).send(updatedReview))
    .catch(next)
})

router.delete('/:id/reviews/:reviewId', (req, res, next) => {
    Review.destroy({where: {id: req.params.reviewId}})
    .then(() => {res.redirect(204, '/')})
})

module.exports = router;
