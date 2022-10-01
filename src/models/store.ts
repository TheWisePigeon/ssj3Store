import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: String,
    owner: String,
    isMain: Boolean,
    description: String
})

const Store = mongoose.model("Store", storeSchema)

export default Store