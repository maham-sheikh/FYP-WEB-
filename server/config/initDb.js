const db = require('../config/db');

const createTables = async () => {
  try {
    const [usersTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'users'
    `);

    if (usersTable.length === 0) {
      await db.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          phone VARCHAR(20),
          cnic VARCHAR(20),
          role ENUM('Vendor', 'Customer') NOT NULL
        );
      `);
      console.log('Users table created successfully.');
    } else {
      console.log('Users table already exists.');
    }

    const [categoriesTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'categories'
    `);

    if (categoriesTable.length === 0) {
      await db.query(`
        CREATE TABLE categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          service_id INT NOT NULL,
          FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
        );
      `);
      console.log('Categories table created successfully.');
    } else {
      console.log('Categories table already exists.');
    }

    const [servicesTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'services'
    `);

    if (servicesTable.length === 0) {
      await db.query(`
        CREATE TABLE services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
      `);
      console.log('Services table created successfully.');
    } else {
      console.log('Services table already exists.');
    }

    const [vendorsTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'vendors'
    `);

    if (vendorsTable.length === 0) {
      await db.query(`
        CREATE TABLE vendors (
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
          status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
        );
      `);
      console.log('Vendors table created successfully.');
    } else {
      console.log('Vendors table already exists.');
    }
    const [customerTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'customers'
    `);

    if (customerTable.length === 0) {
      await db.query(`
        CREATE TABLE customers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        );
      `);
      console.log('Customers table created successfully.');
    } else {
      console.log('Customers table already exists.');
    }

    const [vendorLocationsTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'vendor_locations'
    `);

    if (vendorLocationsTable.length === 0) {
      await db.query(`
        CREATE TABLE vendor_locations (
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
      console.log('Vendor Locations table created successfully.');
    } else {
      console.log('Vendor Locations table already exists.');
    }

    const [requestsTable] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'findigo2' AND table_name = 'service_requests'
    `);

    if (requestsTable.length === 0) {
      await db.query(`
        CREATE TABLE service_requests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          vendor_id INT NOT NULL,
          customer_id INT NOT NULL,
          service_type VARCHAR(255) NOT NULL,
          distance VARCHAR(50) NOT NULL,
          customer_location JSON NOT NULL,
          vendor_location JSON NOT NULL,
          status ENUM('pending', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
          FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
          FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
        );
      `);
      console.log('Service Requests table created successfully.');
    } else {
      console.log('Service Requests table already exists.');
    }

  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

module.exports = createTables;