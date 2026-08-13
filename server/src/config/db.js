import mongoose from 'mongoose';

/**
 * Connects to MongoDB with Mongoose and configures connection lifecycle listeners.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/context-cart';

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`Connected to MongoDB Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.warn('Tip: Make sure MongoDB is running locally or specify a valid MONGO_URI in server/.env.');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
