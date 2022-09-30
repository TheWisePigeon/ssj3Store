import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    details: String,
    owner: String
})


const Product = mongoose.model("Product", productSchema)

export default Product