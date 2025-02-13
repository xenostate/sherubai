const express = require('express');
const path = require('path');
const adminRoutes = require("./routes/admin"); // Ensure correct path
const bodyParser = require("body-parser");

const cors = require('cors');



const app = express();
const PORT = 3000;

app.use(cors());

// 🔹 Ensure Express can parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


const mongoose = require('mongoose');

// Replace this with the connection string you retrieved
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/admin", adminRoutes); // Register admin routes




// Fallback to a default port if PORT is not set
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});