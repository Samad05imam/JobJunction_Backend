import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    console.log("📡 Connecting to MongoDB...");
    console.log("👉 URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Atlas connected via .env');
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
