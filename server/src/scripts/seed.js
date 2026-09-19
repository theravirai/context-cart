import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const sampleProducts = [
  {
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio fidelity.',
    price: 199.99,
    discountPercentage: 15,
    rating: 4.8,
    stock: 45,
    brand: 'SonicPro',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Mechanical Gaming Keyboard',
    description: 'Tactile mechanical keyboard with customizable RGB backlighting, durable aluminum frame, and hot-swappable blue switches.',
    price: 89.99,
    discountPercentage: 10,
    rating: 4.7,
    stock: 30,
    brand: 'KeyForge',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Minimalist Chronograph Watch',
    description: 'Elegant stainless steel analog watch featuring genuine leather strap, sapphire crystal glass, and 50m water resistance.',
    price: 149.5,
    discountPercentage: 20,
    rating: 4.9,
    stock: 20,
    brand: 'Aethel',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Ergonomic Desk Chair',
    description: 'Breathable mesh executive office chair with adaptive lumbar support, 3D armrests, and smooth reclining mechanism.',
    price: 279.0,
    discountPercentage: 5,
    rating: 4.6,
    stock: 15,
    brand: 'ErgoComfort',
    category: 'home',
    thumbnail: 'https://images.unsplash.com/photo-1580481077195-c3a9a3229608?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a9a3229608?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Stainless Steel Insulated Water Bottle',
    description: 'Double-walled vacuum insulated thermal bottle keeping drinks cold for 24 hours or hot for 12 hours. BPA-free.',
    price: 28.0,
    discountPercentage: 0,
    rating: 4.8,
    stock: 120,
    brand: 'HydroLife',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Classic Wool Knit Sweater',
    description: 'Soft and breathable merino wool blend crewneck sweater. Timeless relaxed fit suited for all seasons.',
    price: 64.99,
    discountPercentage: 12,
    rating: 4.5,
    stock: 55,
    brand: 'UrbanKnit',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Ultra-Fast GaN USB-C Charger (65W)',
    description: 'Compact 3-port fast wall charger with GaN technology, capable of charging laptops, tablets, and phones simultaneously.',
    price: 39.99,
    discountPercentage: 15,
    rating: 4.9,
    stock: 80,
    brand: 'VoltGrid',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Aerobic High-Density Yoga Mat',
    description: 'Non-slip eco-friendly TPE workout mat with alignment markings and carrying strap for pilates, gym, and yoga.',
    price: 34.5,
    discountPercentage: 8,
    rating: 4.6,
    stock: 65,
    brand: 'ZenFit',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
    ],
  },
];

const seedProducts = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/context-cart';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully for seeding.');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${inserted.length} sample products!`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
