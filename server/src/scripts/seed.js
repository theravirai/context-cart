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
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
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
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
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
    thumbnail: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Smart Fitness Tracker & Heart Rate Band',
    description: 'Sleek waterproof fitness tracker with vibrant AMOLED color display, continuous 24/7 heart rate monitoring, sleep analysis, and 14-day battery life.',
    price: 59.99,
    discountPercentage: 10,
    rating: 4.7,
    stock: 75,
    brand: 'FitPulse',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Polarized Aviator Sunglasses',
    description: 'Timeless teardrop metal alloy frame sunglasses with premium polarized anti-glare lenses providing 100% UV400 radiation protection.',
    price: 45.0,
    discountPercentage: 0,
    rating: 4.8,
    stock: 90,
    brand: 'Solaris',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Ceramic Pour-Over Coffee Dripper Set',
    description: 'Handcrafted matte ceramic coffee dripper paired with a heat-resistant borosilicate glass carafe and precision stainless steel reusable filter.',
    price: 42.5,
    discountPercentage: 15,
    rating: 4.9,
    stock: 40,
    brand: 'ArtisanRoast',
    category: 'home',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Vintage Waxed Canvas Travel Backpack',
    description: 'Heavy-duty water-resistant waxed canvas rucksack with genuine leather straps, padded 15.6-inch laptop compartment, and antique brass hardware.',
    price: 89.0,
    discountPercentage: 20,
    rating: 4.8,
    stock: 35,
    brand: 'Wanderer',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Retro Wooden Bluetooth Speaker',
    description: 'Vintage walnut wood cabinet wireless speaker with immersive 360-degree acoustics, rich deep bass, analog dials, and 20-hour playback.',
    price: 119.99,
    discountPercentage: 10,
    rating: 4.8,
    stock: 50,
    brand: 'SoundMaster',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Organic Heavyweight Cotton Crewneck Tee',
    description: '100% GOTS-certified heavyweight organic cotton t-shirt with reinforced double-stitched collar and pre-shrunk enzyme wash for ultimate comfort.',
    price: 32.0,
    discountPercentage: 0,
    rating: 4.6,
    stock: 110,
    brand: 'EcoThreads',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Enameled Cast Iron Dutch Oven (5.5 Qt)',
    description: 'Professional-grade enameled cast iron Dutch oven designed for heat retention, crusty sourdough bread baking, braising, and stews.',
    price: 79.99,
    discountPercentage: 15,
    rating: 4.9,
    stock: 25,
    brand: 'NordicKitchen',
    category: 'home',
    thumbnail: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    title: 'Adjustable Cast Iron Strength Kettlebell',
    description: 'Space-saving adjustable kettlebell with intuitive lock-and-load weight plates ranging up to 40 lbs for dynamic home workouts.',
    price: 110.0,
    discountPercentage: 5,
    rating: 4.7,
    stock: 30,
    brand: 'IronCore',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
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
