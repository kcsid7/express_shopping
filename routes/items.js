const express = require("express");

const items = require("../fakeDb.js")

const router = express.Router();

// GET /items :: returns all the items 
router.get("/", (req, res, next) => {
    try{
        return res.json({
            items: items
        })
    } catch(err) {
        return next(err)
    }
})

// POST /items :: Accepts a JSON data and adds it to the item list
router.post("/", (req, res, next) => {
    try {
        const newItem = {
            name: req.body.name,
            price: req.body.price
        }
        items.push(newItem);
        return res.json({
            item: newItem
        })

    } catch(err) {
        return next(err)
    }
})

// GET /items/:name :: Gets the selected item from the item list
router.get("/:name", (req, res, next) => {
    try {
        const selItem = items.find( i => i.name === req.params.name);
        if (selItem === undefined) throw {message: "Item not found", status: 404};
        return res.json({
            item: selItem
        })
    } catch(err) {
        return next(err);
    }
})

// DELETE /items/:name :: Removes the first item by the given name
router.delete("/:name", (req, res, next) => {
    try {
        const itemIdx = items.findIndex( i => i.name === req.params.name );
        if (itemIdx === -1 ) throw {message: "Item not found", status: 404}
        items.splice(itemIdx, 1);
        return res.json({
            message: `${req.params.name} deleted from inventory!`
        })
    } catch(err) {
        return next(err);
    }
})

// PATCH /items/:name :: Updates the selected item using the provided inputs or old inputs if none are provided
router.patch("/:name", (req, res, next) => {
    try {
        const itemIdx = items.findIndex( i => i.name === req.params.name);
        if (itemIdx === -1) throw {message: "Item not found", status: 404};

        items[itemIdx].name = req.body.name || items[itemIdx].name;
        items[itemIdx].price = req.body.price || items[itemIdx].price;

        return res.json({
            message: `${items[itemIdx].name} updated!`,
            item: {
                name: items[itemIdx].name,
                price: items[itemIdx].price
            }
        })

    } catch(err) {
        return next(err);
    }
})



module.exports = router;