const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Job = require("../models/job");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");

const adminUsername = "admin";
const adminPassword = "password123"; // Change this for production security
const secretKey = "your_secret_key";

let jobs = [];
let products = [];

// Admin Login Route
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === adminUsername && password === adminPassword) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: "2h" });
        res.json({ success: true, token });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

// Middleware for Authentication
const authenticateAdmin = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.admin = decoded;
        next();
    });
};

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Get Jobs & Products
router.get("/data", async (req, res) => {
    const jobs = await Job.find();
    const products = await Product.find();
    res.json({ jobs, products });
});

router.post("/add-product", authenticateAdmin, upload.single("image"), async (req, res) => {
    try {
        console.log("🟢 Received raw req.body:", req.body);
        console.log("🟢 Received file:", req.file);

        // Explicitly extract fields
        const name = req.body.name;
        const description = req.body.description;
        const availability = req.body.availability;
        const conditions = req.body.conditions;
        const payment = req.body.payment;
        const delivery = req.body.delivery;
        const price = req.body.price;

        if (!name || !description || !availability || !conditions || !payment || !delivery || !price) {
            console.log("🔴 Missing required fields!");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

        const product = new Product({ name, description, availability, conditions, payment, delivery, price, imageUrl });
        await product.save();

        console.log("✅ Product successfully saved:", product);
        res.json({ success: true, product });
    } catch (error) {
        console.error("❌ Error adding product:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});






router.post("/add-job", async (req, res) => {
    try {
        const { title, description, salary } = req.body;
        
        if (!title || !description || !salary) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newJob = new Job({ title, description, salary });
        await newJob.save();

        res.json({ success: true, job: newJob });
    } catch (error) {
        console.error("Error adding job:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



// Delete Job
router.delete("/delete-job/:id", authenticateAdmin, async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Delete Product
router.delete("/delete-product/:id", authenticateAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});


module.exports = router;
