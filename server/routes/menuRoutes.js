const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Routes definitions
router.get('/', menuController.getMenuItems || ((req, res) => res.json([])));

module.exports = router;