import express from 'express';
import Product from '../models/Products.js';
import { authenticateAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * ADMIN PRODUCT MANAGEMENT ROUTES
 * All routes require admin authentication
 */

// @route   POST /api/admin/products
// @desc    Create a new product with image upload
// @access  Private (Admin)
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
    try {
        const {
            name,
            type,
            price,
            description,
            category,
            stock,
            colors,
            outOfStockColors,
            sizes,
            rating,
            isFeatured,
            badge,
            brand,
            brandLogo,
            sku
        } = req.body;

        // Get image path if uploaded
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        // Create product
        const product = new Product({
            name,
            type,
            price,
            description,
            category,
            image: imagePath,
            stock: stock || 0,
            colors: colors ? JSON.parse(colors) : [],
            outOfStockColors: outOfStockColors ? JSON.parse(outOfStockColors) : [],
            sizes: sizes ? JSON.parse(sizes) : [],
            rating: rating || 0,
            isFeatured: isFeatured === 'true',
            badge: badge || 'new',
            brand: brand || '',
            brandLogo: brandLogo || null,
            sku
        });

        const createdProduct = await product.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: createdProduct
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(400).json({ 
            message: error.message || 'Error creating product' 
        });
    }
});

// @route   PUT /api/admin/products/:id
// @desc    Update a product
// @access  Private (Admin)
router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found' 
            });
        }

        // Update fields if provided
        const {
            name,
            type,
            price,
            description,
            category,
            stock,
            colors,
            outOfStockColors,
            sizes,
            rating,
            isFeatured,
            badge,
            brand,
            brandLogo,
            sku
        } = req.body;

        if (name) product.name = name;
        if (type) product.type = type;
        if (price) product.price = price;
        if (description) product.description = description;
        if (category) product.category = category;
        if (stock !== undefined) product.stock = stock;
        if (colors) product.colors = JSON.parse(colors);
        if (outOfStockColors) product.outOfStockColors = JSON.parse(outOfStockColors);
        if (sizes) product.sizes = JSON.parse(sizes);
        if (rating !== undefined) product.rating = rating;
        if (isFeatured !== undefined) product.isFeatured = isFeatured === 'true';
        if (badge) product.badge = badge;
        if (brand) product.brand = brand;
        if (brandLogo) product.brandLogo = brandLogo;
        if (sku) product.sku = sku;

        // Update image if new one uploaded
        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await product.save();

        res.json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(400).json({ 
            message: error.message || 'Error updating product' 
        });
    }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete a product
// @access  Private (Admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found' 
            });
        }

        await product.deleteOne();

        res.json({ 
            message: 'Product deleted successfully' 
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ 
            message: 'Error deleting product' 
        });
    }
});

// @route   GET /api/admin/products/stats
// @desc    Get product statistics
// @access  Private (Admin)
router.get('/stats', authenticateAdmin, async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const featuredProducts = await Product.countDocuments({ isFeatured: true });
        const outOfStock = await Product.countDocuments({ stock: 0 });
        const lowStock = await Product.countDocuments({ 
            stock: { $gt: 0, $lt: 10 } 
        });

        // Get category counts
        const categoryStats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get brand counts
        const brandStats = await Product.aggregate([
            {
                $group: {
                    _id: '$brand',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]);

        res.json({
            totalProducts,
            featuredProducts,
            outOfStock,
            lowStock,
            categoryStats,
            brandStats
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ 
            message: 'Error fetching statistics' 
        });
    }
});

// @route   PATCH /api/admin/products/:id/stock
// @desc    Update product stock quickly
// @access  Private (Admin)
router.patch('/:id/stock', authenticateAdmin, async (req, res) => {
    try {
        const { stock } = req.body;

        if (stock === undefined) {
            return res.status(400).json({ 
                message: 'Stock value is required' 
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { stock },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found' 
            });
        }

        res.json({
            message: 'Stock updated successfully',
            product
        });
    } catch (error) {
        console.error('Update stock error:', error);
        res.status(400).json({ 
            message: error.message || 'Error updating stock' 
        });
    }
});

// @route   PATCH /api/admin/products/:id/featured
// @desc    Toggle product featured status
// @access  Private (Admin)
router.patch('/:id/featured', authenticateAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found' 
            });
        }

        product.isFeatured = !product.isFeatured;
        await product.save();

        res.json({
            message: `Product ${product.isFeatured ? 'featured' : 'unfeatured'} successfully`,
            product
        });
    } catch (error) {
        console.error('Toggle featured error:', error);
        res.status(500).json({ 
            message: 'Error toggling featured status' 
        });
    }
});

export default router;