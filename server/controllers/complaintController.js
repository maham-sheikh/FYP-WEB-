const db = require('../config/db');

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { vendorId, customerId, message, serviceId } = req.body;

    if (!vendorId || !customerId || !message || !serviceId) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const sql = `
      INSERT INTO complaints (vendorId, customerId, message, serviceId, status, created_at)
      VALUES (?, ?, ?, ?, 'unresolved', NOW())
    `;
    await db.query(sql, [vendorId, customerId, message, serviceId]);

    res.status(201).json({ message: 'Complaint submitted.' });
  } catch (err) {
    console.error('Error saving complaint:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch unresolved complaints
exports.getUnresolvedComplaints = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM complaints WHERE status = 'unresolved'`);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching unresolved complaints:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch resolved complaints
exports.getResolvedComplaints = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM complaints WHERE status = 'resolved'`);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching resolved complaints:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark complaint as resolved
exports.resolveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;
    await db.query(`UPDATE complaints SET status = 'resolved' WHERE id = ?`, [complaintId]);
    res.status(200).json({ message: 'Complaint marked as resolved.' });
  } catch (err) {
    console.error('Error resolving complaint:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark complaint back to pending (unresolved)
exports.pendingComplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;
    await db.query(`UPDATE complaints SET status = 'unresolved' WHERE id = ?`, [complaintId]);
    res.status(200).json({ message: 'Complaint marked as pending.' });
  } catch (err) {
    console.error('Error marking complaint pending:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM complaints WHERE id = ?`, [id]);
    res.status(200).json({ message: 'Complaint deleted successfully.' });
  } catch (err) {
    console.error('Error deleting complaint:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
