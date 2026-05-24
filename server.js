import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow your Vercel frontend
app.use(
  cors({
    origin: "https://mern-ecommerce-app-ochre.vercel.app", // no trailing slash
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
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })

  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
