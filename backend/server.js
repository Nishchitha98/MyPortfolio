require("dotenv").config();
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ONLY ONE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    family: 4
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Contact API
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(200).json({ message: "Message saved successfully" });

    } catch (error) {
        res.status(500).json({ error: "Error saving message" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use(cors({
    origin: "*"
}));