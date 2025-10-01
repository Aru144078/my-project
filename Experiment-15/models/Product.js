const mongoose = require('mongoose');
const variantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL', 'XXL', 'One Size']
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Apparel', 'Books', 'Home Goods', 'Accessories']
    },
    description: {
        type: String,
        default: 'A wonderful product.'
    },
    variants: {
        type: [variantSchema], 
        required: true
    }
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;