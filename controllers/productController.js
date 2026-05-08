const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    let { category, minPrice, maxPrice, search, sort } = req.query;
    let query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    let products = await Product.find(query);
    if (sort === 'price_asc') products.sort((a,b) => a.price - b.price);
    else if (sort === 'price_desc') products.sort((a,b) => b.price - a.price);
    else if (sort === 'rating') products.sort((a,b) => b.rating - a.rating);
    else if (sort === 'newest') products.sort((a,b) => b.createdAt - a.createdAt);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found', success: false });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { getProducts, getProductById, getCategories };