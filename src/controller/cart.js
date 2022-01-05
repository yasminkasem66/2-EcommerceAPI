const Cart = require('../models/cart');


const addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id }).exec((err, cart) => {
        if (err) return res.status(400).json({ err });
        if (cart) {
            // if cart alrready  exist  then update the cart by quantity
            let prd = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == prd)
            let condition, update;
            if (item) {
                condition = { "user": req.user._id, "cartItems.product": prd };
                update = {
                    "$set": { "cartItems.$": { ...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity } }
                }
            } else {
                condition = { user: req.user._id };
                update = {
                    "$push": { "cartItems": req.body.cartItems }
                }
            }
            Cart.findOneAndUpdate(condition, update , {
                new: true,
                runValidators: true,
            }).exec((err, _cart) => {
                if (err) return res.status(400).json({ err });
                if (cart) return res.status(201).json({ cart: _cart })
            })


        } else {
            // if cart doesnt  exist  then creat the cart 
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            cart.save((err, cart) => {
                if (err) return res.status(400).json({ err })
                if (cart) return res.status(201).json({ cart })
            })

        }
    })


};


module.exports = {
    addItemToCart
}