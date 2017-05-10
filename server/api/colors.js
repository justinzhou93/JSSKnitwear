const router = require('express').Router()
const Promise = require('bluebird');
const Product = require('../../db/models/product');
const Color = require('../../db/models/color')
const LineItem = require('../../db/models/lineitem')

router.param('id', (req, res, next, id) => {
  Color.findOne({
    where: {id},
    include: [
      {model: Product},
      {model: LineItem}
    ]
  })
  .then(color => {
    if (!color) {
      const err = new Error('does not exist');
      err.status = 404;
      next(err);
    } else {
      req.requestedColor = color;
      next()
    }
  })
})

router.get('/', (req, res, next) => {
  Color.findAll({
    include: [
      {model: Product},
      {model: LineItem}
    ]
  })
  .then(colors => res.json(colors))
  .catch(next);
})

// get color by id
router.get('/:id', (req, res, next) => {
  res.json(req.requestedColor);
})

// ADMIN: post new color
router.post('/', (req, res, next) => {
  Color.create(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch(next)
})

// ADMIN: update color
// recommend destroy and recreate
router.put('/:id', (req, res, next) => {
  req.requestedColor.update(req.body)
  .then(updatedColor => res.json(updatedColor))
  .catch(next);
})

// ADMIN: remove color --> should rarely happen, but just in case...
router.delete('/:id', (req, res, next) => {
  req.requestedColor.destroy()
  .then(() => res.redirect(204, '/'))
})
