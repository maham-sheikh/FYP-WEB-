require("dotenv").config();
const express = require("express");
const router = express.Router();
const twilio = require("twilio");


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);


const generateOTP = () => Math.floor(10000 + Math.random() * 90000).toString();


const otpStore = {};

router.post("/send-otp", async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    const otp = generateOTP(); 
    otpStore[phone] = otp; 
    console.log(`Generated OTP for ${phone}: ${otp}`);

    try {
        const message = await client.messages.create({
            body: `Your verification code is: ${otp}`,
            from: twilioPhoneNumber,
            to: phone,
        });

        return res.status(200).json({ success: true, message: "OTP sent successfully", sid: message.sid });
    } catch (error) {
        console.error("Twilio error:", error);
        return res.status(500).json({ error: "Failed to send OTP" });
    }
});

router.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ error: "Phone and OTP are required" });
    }

    if (otpStore[phone] === otp) {
        delete otpStore[phone]; 
        return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } else {
        return res.status(400).json({ error: "Invalid OTP" });
    }
});

module.exports = router;
