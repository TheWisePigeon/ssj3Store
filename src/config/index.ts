import mongoose from "mongoose";

const connectToDB = async () => {
    const uri =  process.env.DB_URL as string || "mongodb://localhost:27017/storeal"
    mongoose.connect(
        uri
    ).then(
        ()=>{
            console.log("connected to database")
        }
    ).catch(
        ()=>{
            console.log("Something went wrong")
        }
    )
}




export {
    connectToDB
}