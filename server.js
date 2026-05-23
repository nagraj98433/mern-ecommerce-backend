import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

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
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
