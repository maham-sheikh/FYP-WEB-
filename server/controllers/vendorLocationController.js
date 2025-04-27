const db = require('../config/db');

exports.saveVendorLocation = async (req, res) => {
  const { vendorId, latitude, longitude, businessName,workingHours, serviceType } = req.body;

  if (!vendorId || !latitude || !longitude || !businessName || !workingHours || !serviceType) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing required fields' 
    });
  }

  try {
    const query = `
      INSERT INTO vendor_locations (vendor_id, latitude, longitude, business_name, working_hours, service_type)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        latitude = VALUES(latitude),
        longitude = VALUES(longitude),
        business_name = VALUES(business_name),
        working_hours = VALUES(working_hours),
        service_type = VALUES(service_type)
    `;
    
    const [result] = await db.query(query, [
      vendorId, 
      latitude, 
      longitude, 
      businessName,
      workingHours, 
      serviceType
    ]);

    const action = result.affectedRows === 1 ? 'created' : 'updated';
    return res.status(200).json({ 
      success: true,
      message: `Location ${action} successfully` 
    });

  } catch (error) {
    console.error('Error saving location:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to save location',
      error: error.message 
    });
  }
};

exports.updateVendorLocation = async (req, res) => {
  const { vendorId } = req.params;
  const { latitude, longitude, businessName, workingHours, serviceType } = req.body;

  if (!latitude || !longitude || !businessName || !workingHours || !serviceType) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing required fields' 
    });
  }

  try {
    const query = `
      UPDATE vendor_locations 
      SET latitude = ?, longitude = ?, business_name = ?, working_hours = ?, service_type = ?
      WHERE vendor_id = ?
    `;
    
    const [result] = await db.query(query, [
      latitude, 
      longitude, 
      businessName,
      workingHours, 
      serviceType, 
      vendorId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Vendor location not found' 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Location updated successfully' 
    });

  } catch (error) {
    console.error('Error updating location:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to update location',
      error: error.message 
    });
  }
};


exports.getVendorLocation = async (req, res) => {
    const { vendorId } = req.params;
  
    try {
      const query = 'SELECT * FROM vendor_locations WHERE vendor_id = ?';
      const [results] = await db.query(query, [vendorId]);
  
      if (results.length === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Location not found' 
        });
      }
  
      return res.status(200).json({ 
        success: true,
        data: results[0]
      });
  
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to fetch location'
      });
    }
  };