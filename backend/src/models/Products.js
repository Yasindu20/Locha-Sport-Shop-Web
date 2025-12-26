import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Name must be at Least 3 characters Long']
    },
    type: {
        type: String,
        required: [true, 'Please enter product item'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please enter product Price'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Please enter product Description'],
        minLength: [10, 'Description must be at Least 10 characters Long'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please enter product Category'],
        trim: true,
        enum: ['Football', 'Basketball', 'Tennis', 'Running', 'Fitness', 'Swimming'],
    },
    image: {
        type: String,
        required: [true, 'Please enter product Image URL'],
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5'],

    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    badge: {
        type: String,
        enum: ['new', 'sale', 'bestselling', 'limited'],
        default: 'new'
    },
    brand: {
        type: String,
        default: false,
    },
    brandLogo: {
        type: String,
        default: null,
    },
    sku: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
