import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow your Vercel frontend

const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://mern-ecommerce-app-ochre.vercel.app", // Vercel production
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// IMPORT ROUTES AFTER dotenv
import productRoutes from "./routes/productRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // fail fast instead of hanging
  })
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
