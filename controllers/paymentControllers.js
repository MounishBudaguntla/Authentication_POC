const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel');

exports.createPayments = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });

        const sessionUrl = session.url;

        res.status(200).json({ sessionId: session.id, sessionUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};