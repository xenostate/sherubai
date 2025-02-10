const express = require('express');
const path = require('path');
const adminRoutes = require("./routes/admin"); // Ensure correct path
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// 🔹 Ensure Express can parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/sherubaiDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/admin", adminRoutes); // Register admin routes



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
