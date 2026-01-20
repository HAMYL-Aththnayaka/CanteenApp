import helpingHandModel from '../Models/helpingHandModel.js'; 
import orderModel from '../Models/orderModel.js';

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, amount, totalAmount, address, paymentMethod, orderType } = req.body;
    const finalAmount = totalAmount !== undefined ? totalAmount : amount;
    const userId = req.body.userId || req.userId || (req.user && req.user._id);

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    if (finalAmount === 0) {
      const newOrder = new orderModel({
        userId, 
        items,
        amount: 0,
        address,
        status: "Pending",
        payment: true
      });
      await newOrder.save();
      return res.json({ success: true, message: "Free order placed" });
    }

    // Regular Order logic
    const order = await orderModel.create({
      userId,
      items,
      amount: finalAmount,
      address,
      paymentMethod,
      orderType,
      payment: paymentMethod === 'online',
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: paymentMethod === 'online' ? 'Order placed and paid successfully' : 'Order placed, pay at counter',
      orderId: order._id
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Verify Order
export const verifyOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, payment: order.payment, status: order.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get user orders
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, alert: err.message });
  }
};

// List all orders (admin)
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, alert: err.message });
  }
};

// Update order status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status, canteen } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, alert: "Order not found" });

    // Add to Helping Hand logic
    if (status && status.trim().toLowerCase() === "add to hh") {
      const orderCanteen = canteen || "Applied-Canteen";

      for (const item of order.items) {
        const exists = await helpingHandModel.findOne({ name: item.name, image: item.image });
        if (!exists) {
          await helpingHandModel.create({
            name: item.name,
            description: item.description || `Redistributed from order: ${order._id}`,
            price: 0,
            catagory: item.catagory || "General",
            canteen: orderCanteen,
            image: item.image
          });
        }
      }
      await orderModel.findByIdAndDelete(orderId);

      return res.status(200).json({
        success: true,
        alert: "Order moved to Helping Hand and deleted from active orders"
      });
    }

    // Delivered logic
    if (status === "Delivered") {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(200).json({ success: true, alert: "Order delivered and deleted" });
    }

    // Just update status
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, alert: "Status updated" });

  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ success: false, alert: err.message });
  }
};
