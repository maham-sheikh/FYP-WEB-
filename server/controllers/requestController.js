const db = require('../config/db');

exports.requestService = async (req, res) => {
  try {
    const { vendorId, customerId, serviceType, distance, customerLocation, vendorLocation } = req.body;

    const [result] = await db.query(`
      INSERT INTO service_requests 
        (vendor_id, customer_id, service_type, distance, customer_location, vendor_location)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      vendorId,
      customerId,
      serviceType,
      distance,
      JSON.stringify(customerLocation),
      JSON.stringify(vendorLocation)
    ]);

    res.status(201).json({ success: true, requestId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const { vendorId } = req.query;
    if (!vendorId) return res.status(400).json({ error: 'Vendor ID required' });

    const [requests] = await db.query(`
      SELECT * FROM service_requests
      WHERE vendor_id = ? AND status != 'completed'
      ORDER BY created_at DESC
    `, [vendorId]);

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getVendorRequests = async (req, res) => {
  try {
    const { vendorId } = req.query;
    const [requests] = await db.query(`
      SELECT sr.*, c.name as customer_name 
      FROM service_requests sr
      JOIN customers c ON sr.customer_id = c.id
      WHERE vendor_id = ? AND status != 'completed'
      ORDER BY created_at DESC
    `, [vendorId]);

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCustomerRequests = async (req, res) => {
  try {
    const { customerId } = req.query;
    const [requests] = await db.query(`
      SELECT sr.*, vl.business_name AS vendor_name
      FROM service_requests sr
      JOIN vendors v ON sr.vendor_id = v.id
      JOIN vendor_locations vl ON v.id = vl.vendor_id
      WHERE sr.customer_id = ?
      ORDER BY sr.created_at DESC
    `, [customerId]);

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.handleRequestAction = async (req, res) => {
  try {
    const { requestId, action } = req.body;

    await db.query(
      `UPDATE service_requests SET status = ? WHERE id = ?`,
      [action, requestId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Complete a request
exports.completeRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    await db.query(
      `UPDATE service_requests SET status = 'completed' WHERE id = ?`,
      [requestId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.deleteRequest = async (req, res) => {
    try {
      const { requestId } = req.body;
      
      await db.query('DELETE FROM service_requests WHERE id = ?', [requestId]);
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting request:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
};