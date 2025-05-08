const db = require('../config/db');

const createTables = async () => {
  try {
    console.log("Starting table checks and creation...");

    // Drop old service_requests table if exists
    // await db.query(`DROP TABLE IF EXISTS service_requests`);
    // console.log(" Dropped old service_requests table if it existed.");

    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        cnic VARCHAR(20),
        role ENUM('Vendor', 'Customer') NOT NULL
      );
    `);
    console.log("✅ Users table ready.");

    // Services table
    await db.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);
    console.log("✅ Services table ready.");
  
    // Categories table
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        service_id INT NOT NULL,
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Categories table ready.");

    // Vendors table
    await db.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        cnic VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        address VARCHAR(255) NOT NULL,
        postalCode VARCHAR(20),
        city VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        businessCategory VARCHAR(255) NOT NULL,
        subService VARCHAR(255) NOT NULL,
        price VARCHAR(20) DEFAULT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
      );
    `);
 
    
    // Customers table
    await db.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log("✅ Customers table ready.");

    // Vendor Locations
    await db.query(`
      CREATE TABLE IF NOT EXISTS vendor_locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vendor_id INT NOT NULL,
        latitude DECIMAL(9,6) NOT NULL,
        longitude DECIMAL(9,6) NOT NULL,
        business_name VARCHAR(255),
        working_hours VARCHAR(100),
        service_type VARCHAR(50),
        FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Vendor Locations table ready.");
     
    await db.query(`ALTER TABLE vendors
MODIFY COLUMN price VARCHAR(20) DEFAULT NULL AFTER subService;
`)
    // Service Requests
    await db.query(`
      CREATE TABLE  IF NOT EXISTS service_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vendor_id INT NOT NULL,
        customer_id INT NOT NULL,
        service_type VARCHAR(255) NOT NULL,
        distance VARCHAR(50) NOT NULL,
        customer_location JSON NOT NULL,
        vendor_location JSON NOT NULL,
        status ENUM('pending', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Service Requests table recreated.");

    // Reviews table
    await db.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vendorId INT NOT NULL,
        customerId INT NOT NULL,
        rating DECIMAL(2,1) NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vendorId) REFERENCES vendors(id) ON DELETE CASCADE,
        FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Reviews table ready.");

    await db.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vendorId INT NOT NULL,
        customerId INT NOT NULL,
        serviceId INT NOT NULL,
        message TEXT NOT NULL,
        status ENUM('unresolved', 'resolved') DEFAULT 'unresolved',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vendorId) REFERENCES vendors(id) ON DELETE CASCADE,
        FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Complaints table ready.");

    console.log(" All tables initialized successfully.");

  } catch (error) {
    console.error("❌ Error during table creation:", error);
  }
};

module.exports = createTables;
