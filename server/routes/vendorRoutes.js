const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET Vendor Profile
router.get("/profile", async (req, res) => {
  try {
    const vendorId = req.query.id;

    if (!vendorId) {
      return res.status(400).json({ status: "error", message: "Vendor ID is required" });
    }

    const query = `
      SELECT 
        v.fullName, 
        v.email, 
        v.phone, 
        v.businessCategory, 
        v.subService,
        v.price,
        vl.business_name,
        vl.working_hours
      FROM vendors v
      LEFT JOIN vendor_locations vl ON v.id = vl.vendor_id
      WHERE v.id = ?
    `;

    const [results] = await db.query(query, [vendorId]);

    if (results.length === 0) {
      return res.status(404).json({ status: "error", message: "Vendor not found" });
    }

    return res.status(200).json({
      status: "success",
      data: results[0]
    });

  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// POST Vendor Login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ status: "error", message: "Phone and password are required." });
  }

  try {
    const query = "SELECT * FROM vendors WHERE phone = ?";
    const [results] = await db.query(query, [phone]);

    if (results.length === 0) {
      return res.status(401).json({ status: "error", message: "Invalid phone or password" });
    }

    const vendor = results[0];

    if (vendor.password !== password) {
      return res.status(401).json({ status: "error", message: "Invalid phone or password" });
    }

    if (vendor.status !== "approved") {
      return res.status(403).json({ status: "error", message: "Your account is not approved yet." });
    }

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      vendor: { id: vendor.id, phone: vendor.phone, name: vendor.fullName },
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// PUT Update Vendor Price
// router.put("/profile/update-price", async (req, res) => {
//   const { vendorId, newPrice } = req.body;

//   if (!vendorId || newPrice === undefined) {
//     return res.status(400).json({ status: "error", message: "Vendor ID and new price are required." });
//   }

//   try {
//     const updateQuery = `
//       UPDATE vendors
//       SET price = ?
//       WHERE id = ?
//     `;
//     const [result] = await db.query(updateQuery, [newPrice, vendorId]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ status: "error", message: "Vendor not found." });
//     }

//     return res.status(200).json({ status: "success", message: "Price updated successfully." });

//   } catch (error) {
//     console.error("Error updating price:", error);
//     res.status(500).json({ status: "error", message: "Internal server error" });
//   }
// });

module.exports = router;
