  import express, { json } from 'express';
  import { connect } from 'mongoose';
  import cors from 'cors';
  import authRoutes from './routes/Auth.js';
  import { config } from 'dotenv';

  config();
  const app = express();
  app.use(express.json());
  app.use(cors());
  // app.use(express.json()); 

  // Connect to MongoDB
  import mongoose from 'mongoose';
const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb+srv://cchild232:eNdrvMf2B14GkBye@cluster0.y79xmck.mongodb.net/reactHelperDB?retryWrites=true&w=majority`);    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDb();

  // Routes

  app.use('/api/auth', authRoutes);
  app.use('/api/auth',authRoutes)
  // Start server
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
