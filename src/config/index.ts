import mongoose from "mongoose";

const connectToDB = async () => {
    const uri = "mongodb://localhost:27017"
    mongoose.connect(
        uri, (err)=>{
            if(err){
                console.log(`Failed to connect to db: ${err.message}`)
            }
            console.log("Connected to database")
        }
    )
}




export {
    connectToDB
}