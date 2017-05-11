const router = require('express').Router();
const Promise = require('bluebird');
const Product = require('../../db/models/product');
const Size = require('../../db/models/size')
const LineItem = require('../../db/models/lineitem')

router.param('id', (req, res, next, id) => {
  Size.findOne({
    where: {id},
    include: [
      {model: LineItem}
    ]
  })
  .then(size => {
    if (!size) {
      const err = new Error('does not exist');
      err.status = 404;
      next(err);
    } else {
      req.requestedSize = size;
      next()
    }
  })
})

router.get('/', (req, res, next) => {
    Size.findAll({
        include: [
            {model: LineItem}
        ]
    })
    .then(sizes => res.json(sizes))
    .catch(next);
})

// get size by id
router.get('/:id', (req, res, next) => {
    res.json(req.requestedSize);
})

// ADMIN: post new size
router.post('/', (req, res, next) => {
    Size.create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next)
})

// ADMIN: update size
// recommend destroy and recreate
router.put('/:id', (req, res, next) => {
    req.requestedSize.update(req.body)
    .then(updatedSize => res.json(updatedSize))
    .catch(next);
})

// ADMIN: remove size --> should rarely happen, but just in case...
router.delete('/:id', (req, res, next) => {
    req.requestedSize.destroy()
    .then(() => res.redirect(204, '/'))
})

module.exports = router;
