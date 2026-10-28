exports.createOrder = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};