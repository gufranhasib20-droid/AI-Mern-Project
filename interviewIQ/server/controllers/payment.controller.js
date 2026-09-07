import User from "../models/user.model.js";
import crypto from "crypto";

const FAKE_SECRET = process.env.RAZORPAY_FAKE_SECRET;
export const createOrder = async (req, res) => {
  try {
    const { credits, amount } = req.body; // e.g. { credits: 150, amount: 249 }

    
    const fakeOrder = {
      id: "order_" + crypto.randomBytes(8).toString("hex"),
      amount: amount * 100, // Razorpay uses paise, so we mimic that
      currency: "INR",
      credits: credits
    };

    res.status(200).json({ success: true, order: fakeOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, credits } = req.body;
    const userId = req.userId; 

    const isValid = orderId && orderId.startsWith("order_");

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid payment" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { credits: credits } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified, credits added",
      user 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};