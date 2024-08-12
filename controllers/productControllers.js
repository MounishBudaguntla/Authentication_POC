const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const { sendProductUpdateEmail } = require('../controllers/mailControllers');

exports.createProduct = async(req, res) => {
    const {name, price, quantity, description} = req.body
    const userId = req.auth.id;
    try {
        const existingProduct = await Product.findOne({name, user:userId})
        if (existingProduct) {
            return res.status(400).json({message: 'Product already exists'});
        }
        const product = new Product({name, price, quantity, description, user: userId});
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getProductById = async(req, res) => {
    const userId = req.auth.id;
    try {
        const product = await Product.findById(req.params.id).populate('user', 'email');
        if (!product || product.user.toString()!== userId) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.json(product);
    } catch (err) {
    res.status(500).json({error: err.message});
}};

exports.getUserProducts = async(req, res) => {
    const userId = req.auth.id;
    try {
        const products = await Product.find({user: userId}).populate('user', 'email');
        res.json(products);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.updateProduct = async(req, res) => {
    const userId = req.auth.id;
    const {name, price, quantity, description} = req.body;
    try {
        const product = await Product.findById(req.params.id).populate('user', 'email');
        if (!product || product.user.toString() !== userId) {
            return res.status(404).json({message: 'Product not found'});
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.description = description || product.description;
        await product.save();

        const cartsWithProduct = await Cart.find({ 'items.product': req.params.id }).populate('user', 'email');

        for (const cart of cartsWithProduct) {
            const userEmail = cart.user.email;
            sendProductUpdateEmail(userEmail, product.name);
        }

        res.json(product);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.deleteProduct = async(req, res) => {
    const userId = req.auth.id;
    const userRole = req.auth.role;
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          if (product.user.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
          }
        res.json({message: 'Product deleted'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
