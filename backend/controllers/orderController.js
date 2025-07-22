import mongoose from 'mongoose'; // ✅ Required
import Order from "../models/Order.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";


export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, paymentMethod } = req.body;
    const userId = req.user?.id || req.body.userId;

    console.log("🧑 User ID:", userId);
    console.log("➡️ Received order body:", req.body);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order." });
    }

    if (!shippingAddress || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Incomplete order details." });
    }

    const newOrder = new Order({
      user: userId,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    await newOrder.save();

    const user = await User.findById(userId);

    if (!user || !user.email) {
      console.error("❌ User email not found for user:", user);
      return res.status(400).json({ message: "User email not found" });
    }

    console.log("📨 Sending confirmation to:", user.email);

    await sendEmail(
        user.email,
        "Order Confirmation",
        `<p>Dear ${user.name || "Customer"},<br/>Your order has been placed successfully.</p>`
      );
    // Send confirmation to user
    // await sendEmail({
    //   to: user.email,
    //   subject: "Order Confirmation",
    //   html: `<p>Dear ${user.name || "Customer"},<br/>Your order has been placed successfully. Thank you for shopping with us!</p>`,
    // });

    // Send notification to admin
    // await sendEmail({
    //   to: "techshekhar2@gmail.com",
    //   subject: "New Order Placed",
    //   html: `<p>New order placed by: <strong>${shippingAddress?.name || user.name}</strong><br/>Email: ${user.email}</p>`,
    // });

    await sendEmail(
        "techshekhar2@gmail.com",
        "New Order Placed",
        `<p>New order by: <strong>${shippingAddress?.name || user.name}</strong><br/>Email: ${user.email}</p>`
      );

    console.log("📧 Admin notified about the order");

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error("🔥 Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
