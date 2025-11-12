//Create the mongo model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
})

//Export
const Product = mongoose.model("Product", productSchema);
module.exports = Product;