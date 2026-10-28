// Database model load karne ka try-catch safety check
let Reservation;
try {
  Reservation = require('../models/Reservation');
} catch (err) {
  console.log("Reservation model load nahi hua, temporary data handle hoga.");
}

// 1. Create Reservation
exports.createReservation = async (req, res) => {
  try {
    const { date, time, guests, name, phone } = req.body;

    if (Reservation) {
      const newReservation = new Reservation({ date, time, guests, name, phone });
      await newReservation.save();
      return res.status(201).json({ success: true, message: "Reservation created successfully", data: newReservation });
    }

    // Mock Response agar DB connect nahi
    return res.status(201).json({
      success: true,
      message: "Reservation created successfully (Mock)",
      data: { id: Date.now(), date, time, guests, name, phone }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating reservation", error: error.message });
  }
};

// 2. Get All Reservations
exports.getAllReservations = async (req, res) => {
  try {
    if (Reservation) {
      const reservations = await Reservation.find();
      return res.status(200).json({ success: true, data: reservations });
    }
    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching reservations" });
  }
};

// 3. Get My Reservations
exports.getMyReservations = async (req, res) => {
  try {
    if (Reservation) {
      const reservations = await Reservation.find({ userId: req.user?.id || null });
      return res.status(200).json({ success: true, data: reservations });
    }
    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user reservations" });
  }
};

// 4. Update Reservation Status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (Reservation) {
      const updated = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
      return res.status(200).json({ success: true, message: "Status updated successfully", data: updated });
    }

    return res.status(200).json({ success: true, message: "Status updated successfully (Mock)", id, status });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating reservation status" });
  }
};