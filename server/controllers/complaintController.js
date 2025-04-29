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

// Get unresolved complaints
exports.getunresolvedcomplaint = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM complaints WHERE status = 'unresolved'`);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getresolvedcomplaint = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM complaints WHERE status = 'resolved'`);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.resolvecomplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;
    await db.query(`UPDATE complaints SET status = 'resolved' WHERE id = ?`, [complaintId]);
    res.status(200).json({ message: 'Complaint marked resolved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.pendingcomplaint = async (req, res) => {
  try {
    const { complaintId } = req.body;
    await db.query(`UPDATE complaints SET status = 'unresolved' WHERE id = ?`, [complaintId]);
    res.status(200).json({ message: 'Complaint marked pending' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
