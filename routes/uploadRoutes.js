// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// POST route to handle image uploads
router.post('/upload', uploadController.uploadImage);

module.exports = router;
