const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Submit a new review
router.post('/', reviewController.submitReview);

// Get all reviews (optional: filter by vendor ID)
router.get('/', reviewController.getAllReviews);

// Get average rating for a vendor
router.get('/average/:vendorId', reviewController.getAverageRating);

module.exports = router;
