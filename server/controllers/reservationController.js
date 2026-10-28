const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

// Create Reservation
const createReservation = async (req, res) => {
  try {
    const { tableId, date, timeSlot, partySize, contactPhone } = req.body;

    if (!tableId || !date || !timeSlot || !partySize || !contactPhone) {
      return res.status(400).json({ message: 'Please provide all reservation details' });
    }

    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: 'Selected table not found' });
    }

    if (table.capacity < partySize) {
      return res.status(400).json({ message: `Table capacity (${table.capacity}) is too small for party size (${partySize})` });
    }

    // Check availability
    const existingBooking = await Reservation.findOne({
      tableId,
      date,
      timeSlot,
      status: { $ne: 'Cancelled' }
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'Table is already booked for this date and time slot' });
    }

    const reservation = await Reservation.create({
      userId: req.user.id,
      tableId,
      date,
      timeSlot,
      partySize,
      contactPhone,
      status: 'Pending'
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Reservations (Customer)
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).populate('tableId').sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Reservations (Manager)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId', 'name email').populate('tableId').sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Reservation Status (Manager)
const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus
};