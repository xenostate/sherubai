const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    availability: { type: String, required: true },
    conditions: { type: String, required: true },
    payment: { type: String, required: true },
    delivery: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: "" }
});



module.exports = mongoose.model("Product", ProductSchema);
