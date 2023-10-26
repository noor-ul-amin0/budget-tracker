import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.MONGODB_URI || '';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the application on a database connection error
  }
};

export default connectDB;
