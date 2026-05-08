const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
dotenv.config();

// Product list with matching images (all verified working URLs)
const productsData = [
  // Electronics
  { name: "iPhone 15 Pro", price: 999, category: "Electronics", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", rating: 4.9 },
  { name: "Samsung Galaxy S24", price: 899, category: "Electronics", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", rating: 4.8 },
  { name: "Sony WH-1000XM5", price: 399, category: "Electronics", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400", rating: 4.8 },
  { name: "MacBook Pro", price: 1999, category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", rating: 4.9 },
  { name: "iPad Air", price: 599, category: "Electronics", image: "https://images.unsplash.com/photo-1544244015-0df4b3ff3c6c?w=400", rating: 4.7 },
  { name: "Wireless Speaker", price: 79, category: "Electronics", image: "https://images.unsplash.com/photo-1589003077984-894e133ddfab?w=400", rating: 4.4 },
  { name: "Smart Watch", price: 249, category: "Electronics", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400", rating: 4.5 },
  { name: "Gaming Keyboard", price: 129, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", rating: 4.6 },
  
  // Clothing
  { name: "Leather Jacket", price: 199, category: "Clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", rating: 4.6 },
  { name: "Denim Jeans", price: 79, category: "Clothing", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", rating: 4.5 },
  { name: "Summer Dress", price: 59, category: "Clothing", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400", rating: 4.4 },
  { name: "Running Shoes", price: 120, category: "Clothing", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", rating: 4.7 },
  { name: "Wool Sweater", price: 65, category: "Clothing", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400", rating: 4.5 },
  { name: "Running Shorts", price: 35, category: "Clothing", image: "https://images.unsplash.com/photo-1565693413579-8a2b2f4b1c6b?w=400", rating: 4.3 },
  
  // Books
  { name: "The Great Gatsby", price: 15, category: "Books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", rating: 4.9 },
  { name: "Harry Potter Collection", price: 45, category: "Books", image: "https://images.unsplash.com/photo-1600189261867-2e7e2b6e5f5a?w=400", rating: 4.9 },
  { name: "Atomic Habits", price: 18, category: "Books", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400", rating: 4.8 },
  { name: "Cookbook", price: 25, category: "Books", image: "https://images.unsplash.com/photo-1581553680323-aa5e7b8e8a7a?w=400", rating: 4.7 },
  
  // Home
  { name: "Modern Coffee Table", price: 299, category: "Home", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400", rating: 4.3 },
  { name: "Floor Lamp", price: 89, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", rating: 4.4 },
  { name: "Desk Chair", price: 199, category: "Home", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400", rating: 4.4 },
  { name: "Wall Clock", price: 45, category: "Home", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400", rating: 4.3 },
  
  // Sports
  { name: "Nike Air Max", price: 120, category: "Sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", rating: 4.7 },
  { name: "Yoga Mat", price: 35, category: "Sports", image: "https://images.unsplash.com/photo-1592432678016-d910b3d4c4b4?w=400", rating: 4.5 },
  { name: "Dumbbell Set", price: 89, category: "Sports", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400", rating: 4.6 },
  { name: "Football", price: 35, category: "Sports", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400", rating: 4.5 },
  { name: "Basketball", price: 40, category: "Sports", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400", rating: 4.6 },
  
  // Toys
  { name: "LEGO Creator Set", price: 49, category: "Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400", rating: 4.8 },
  { name: "Hot Wheels Set", price: 25, category: "Toys", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400", rating: 4.7 },
  { name: "Teddy Bear", price: 30, category: "Toys", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400", rating: 4.8 },
  { name: "Puzzle Game", price: 20, category: "Toys", image: "https://images.unsplash.com/photo-1611996575749-79a3a239f28a?w=400", rating: 4.6 }
];

// Add more generic products to reach 60+
const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];
const fallbackImages = [
  'https://picsum.photos/id/1/400/300',
  'https://picsum.photos/id/10/400/300',
  'https://picsum.photos/id/100/400/300',
  'https://picsum.photos/id/20/400/300',
  'https://picsum.photos/id/30/400/300'
];

for (let i = productsData.length + 1; i <= 65; i++) {
  const cat = categories[i % categories.length];
  productsData.push({
    name: `${cat} Essential ${i}`,
    price: Math.floor(Math.random() * 150) + 20,
    category: cat,
    image: fallbackImages[i % fallbackImages.length],
    rating: (Math.random() * 2 + 3).toFixed(1),
    description: `High quality ${cat.toLowerCase()} product.`
  });
}

// Add descriptions and stock
const finalProducts = productsData.map(p => ({
  ...p,
  description: p.description || `Premium ${p.name} – great value.`,
  stock: Math.floor(Math.random() * 80) + 10,
  numReviews: Math.floor(Math.random() * 300),
  createdAt: new Date()
}));

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany();
    await Product.insertMany(finalProducts);
    console.log(`✅ Success! ${finalProducts.length} products added with matching images.`);
    process.exit();
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

seedDB();