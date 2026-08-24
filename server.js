require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

// ================================
// Middleware
// ================================
app.use(cors());
app.use(express.json());

// ================================
// Resend Setup
// ================================
const resend = new Resend(process.env.RESEND_API_KEY);

// ================================
// Test Route
// ================================
app.get("/", function (req, res) {
    res.send("Movie Date Server is running ❤️");
});

// ================================
// Send Movie Date Response
// ================================
app.post("/api/send-response", async function (req, res) {

    const {
        name,
        answer,
        movie,
        date,
        time,
        snacks,
        message
    } = req.body;

    console.log("=================================");
    console.log("📩 Send Response API Called");
    console.log("Request Data:", req.body);
    console.log("=================================");

    try {

        const result = await resend.emails.send({

            // Resend test sender
            from: "onboarding@resend.dev",

            // Your email
            to: "boddusaikumar670@gmail.com",

            subject: "❤️ New Movie Date Response",

            html: `
                <div style="font-family: Arial, sans-serif;">

                    <h1>🎬 New Movie Date Response ❤️</h1>

                    <hr>

                    <h2>Response Details</h2>

                    <p>
                        <strong>Name:</strong>
                        ${name || "Not provided"}
                    </p>

                    <p>
                        <strong>Answer:</strong>
                        ${answer || "Not provided"}
                    </p>

                    <p>
                        <strong>Movie:</strong>
                        ${movie || "Not selected"}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${date || "Not selected"}
                    </p>

                    <p>
                        <strong>Preferred Time:</strong>
                        ${time || "Not selected"}
                    </p>

                    <p>
                        <strong>Snacks:</strong>
                        ${snacks || "None selected"}
                    </p>

                    <h3>💌 Message</h3>

                    <p>
                        ${message || "No message"}
                    </p>

                    <hr>

                    <p>
                        ❤️ Movie Date Website
                    </p>

                </div>
            `
        });

        console.log("=================================");
        console.log("✅ EMAIL SENT");
        console.log("Resend Result:", result);
        console.log("=================================");

        res.json({
            success: true,
            message: "Response sent successfully ❤️"
        });

    } catch (error) {

        console.error("=================================");
        console.error("🔥 EMAIL ERROR:");
        console.error(error);
        console.error("=================================");

        res.status(500).json({
            success: false,
            message: error.message || "Failed to send email"
        });
    }
});

// ================================
// Start Server
// ================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {

    console.log("=================================");
    console.log("Movie Date Server Started ❤️");
    console.log(`Server running on port ${PORT}`);
    console.log("=================================");

});
