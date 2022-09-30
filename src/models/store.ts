import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    owner: String,
    isMain: Boolean,
    manager: String
})

const Store = mongoose.model("Store", storeSchema)

export default Store