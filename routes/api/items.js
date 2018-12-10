const express = require('express');
const router = express.Router();

const items = require("../../models/Item");

// Get items
router.get('/', (req, res, next) => {
    Item.find()
        .sort({ date: -1})
        .then(items => res.json(items))
});

// Get item
router.get('/:id', (req, res, next) => {
    Item.findById(req.params.id)
    .then(item => res.json(item));
})

// Post item
router.post('/', (req, res, next) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item))
});

// Update item
router.put('/:id', (req, res, next) => {
    const updatedItem = new Item({
        name: req.body.name,
        date: Date.now()
    });

    Item.findById(req.params.id)
    .then(item => item.updateOne(updatedItem).then((item) => res.json(item)))
    .catch(err => res.status(404).json( { success: false } ));
});

// Delete item
router.delete('/:id', (req, res, next) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json( { success: true } )))
    .catch(err => res.status(404).json( { success: false } ));
});
module.exports = router;