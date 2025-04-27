
const express = require('express');
const router = express.Router();
const vendorLocationController = require('../controllers/vendorLocationController');

router.post('/save', vendorLocationController.saveVendorLocation);
router.put('/:vendorId', vendorLocationController.updateVendorLocation);
router.get('/:vendorId', vendorLocationController.getVendorLocation);

module.exports = router;
