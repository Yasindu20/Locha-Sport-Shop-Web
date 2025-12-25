import express from 'express';
import Product from '../models/Products.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/featured', async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/:id', async (req, res ) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            stock: req.body.stock,
            isFeatured: req.body.isFeatured || false,
            badge: req.body.badge || 'new',
            sku: req.body.sku
        })

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;



