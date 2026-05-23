import express from "express";

import Razorpay from "razorpay";

const router = express.Router();

router.post(
  "/create-order",

  async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,

        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: Number(req.body.amount) * 100,

        currency: "INR",
      };

      const order = await razorpay.orders.create(options);

      res.json(order);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  },
);

export default router;
