const db = require("../config/db");

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

exports.registerCustomer = async (req, res) => {
    const { name, phone, password } = req.body;
  
    if (!name || !phone || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    try {
      const [existing] = await db.query("SELECT * FROM customers WHERE phone = ?", ['+92' + phone]);
      if (existing.length > 0) {
        return res.status(400).json({ error: "Phone number already registered." });
      }
  
      await db.query(
        "INSERT INTO customers (name, phone, password) VALUES (?, ?, ?)",
        [name, '+92' + phone, password] 
      );
  
      res.status(201).json({ message: "Customer registered successfully." });
    } catch (err) {
      console.error("Error registering customer:", err);
      res.status(500).json({ error: "Server error." });
    }
};

exports.loginCustomer = async (req, res) => {
    const { phone, password } = req.body;
  
    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password are required." });
    }
  
    try {
      const [customers] = await db.query(
        "SELECT * FROM customers WHERE phone = ?",
        ['+92' + phone]
      );
  
      if (customers.length === 0) {
        return res.status(401).json({ error: "User not found." });
      }
  
      const customer = customers[0]; 
  
      if (customer.password !== password) {
        return res.status(401).json({ error: "Incorrect password." });
      }
  
      res.status(200).json({ 
        message: "Login successful",
        customer: { id: 1 } 
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Server error." });
    }
};

exports.getVendorsByServiceAndLocation = async (req, res) => {
    try {
      const { subService, latitude, longitude, maxDistance } = req.query;
  
      if (!subService || !latitude || !longitude || !maxDistance) {
        return res.status(400).json({ 
          error: 'Missing required parameters' 
        });
      }
  
      const numLat = parseFloat(latitude);
      const numLon = parseFloat(longitude);
      const numMaxDist = parseFloat(maxDistance);
  
      if (isNaN(numLat) || isNaN(numLon) || isNaN(numMaxDist)) {
        return res.status(400).json({ 
          error: 'Invalid numeric parameters' 
        });
      }
  
      const [vendors] = await db.query(`
        SELECT 
          v.id, v.fullName, v.email, v.phone, v.status,
          vl.latitude, vl.longitude, vl.business_name, 
          vl.working_hours, vl.service_type
        FROM vendors v
        JOIN vendor_locations vl ON v.id = vl.vendor_id
        WHERE v.subService = ? AND v.status = 'approved'
      `, [subService]);
  
      const vendorsWithDistance = vendors.map(vendor => {
        const vendorLat = parseFloat(vendor.latitude);
        const vendorLon = parseFloat(vendor.longitude);
        
        const distance = calculateDistance(
          numLat,
          numLon,
          vendorLat,
          vendorLon
        );
  
        return {
          ...vendor,
          distance: distance.toFixed(2),
          rawDistance: distance 
        };
      });
  
      const filteredVendors = vendorsWithDistance.filter(vendor => 
        vendor.rawDistance <= numMaxDist
      );
  
      filteredVendors.sort((a, b) => a.rawDistance - b.rawDistance);
  
      const response = filteredVendors.map(vendor => ({
        ...vendor,
        distance: vendor.distance 
      }));
  
      res.json(response);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

exports.getCustomerRequests = async (req, res) => {
    try {
      const { customerId } = req.query;
      
      const testCustomerId = 1;
      
      const [requests] = await db.query(`
        SELECT r.id, r.status, r.created_at, 
               v.fullName AS vendor_name, 
               r.service_type
        FROM service_requests r
        JOIN vendors v ON r.vendor_id = v.id
        WHERE r.customer_id = ?
        ORDER BY r.created_at DESC
      `, [testCustomerId]);
      
      res.json(requests);
    } catch (error) {
      console.error('Error fetching customer requests:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

exports.requestService = async (req, res) => {
    try {
      const { vendorId, customerId, serviceType, distance, customerLocation, vendorLocation } = req.body;
      
      const testCustomerId = 1;
      
      const [result] = await db.query(`
        INSERT INTO service_requests 
        (vendor_id, customer_id, service_type, distance, customer_location, vendor_location, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
      `, [
        vendorId,
        testCustomerId,
        serviceType,
        distance,
        JSON.stringify(customerLocation),
        JSON.stringify(vendorLocation)
      ]);
      
      res.json({ success: true, requestId: result.insertId });
    } catch (error) {
      console.error('Error creating service request:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
};

exports.completeRequest = async (req, res) => {
    try {
      const { requestId } = req.body;
      
      await db.query(`
        UPDATE service_requests 
        SET status = 'completed', completed_at = NOW()
        WHERE id = ?
      `, [requestId]);
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error completing request:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
};