const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.auth.id;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

        if (itemIndex > -1) {
            return res.status(400).json({ error: 'Product already in cart' });
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.auth.id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.product.equals(productId));
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.viewCart = async (req, res) => {
    const userId = req.auth.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.auth.id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
