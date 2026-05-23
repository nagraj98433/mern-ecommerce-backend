import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // ✅ plural file name
import products from "./data/sampleProducts.js"; // ✅ must exist

dotenv.config(); // ✅ load .env variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Product.deleteMany(); // clear old products
    await Product.insertMany(products); // insert sample products

    console.log("Products Imported ✅");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

importData();
