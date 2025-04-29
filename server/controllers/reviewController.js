const db = require('../config/db'); 


exports.submitReview = async (req, res) => {
  try {
    const { vendorId, customerId, rating, comment } = req.body;

    if (!vendorId || !customerId || !rating) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const sql = `
      INSERT INTO reviews (vendorId, customerId, rating, comment, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await db.query(sql, [vendorId, customerId, rating, comment]);

    res.status(201).json({ message: 'Review submitted successfully.' });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const { vendorId } = req.query;

    let sql = `SELECT * FROM reviews`;
    let params = [];

    if (vendorId) {
      sql += ` WHERE vendorId = ?`;
      params.push(vendorId);
    }

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const sql = `SELECT AVG(rating) AS averageRating FROM reviews WHERE vendorId = ?`;
    const [rows] = await db.query(sql, [vendorId]);

    res.status(200).json({ average: rows[0].averageRating || 0 });
  } catch (err) {
    console.error('Error calculating average rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
