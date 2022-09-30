import mongoose from "mongoose";

const connectToDB = async () => {
    const uri =  "mongodb+srv://admin:admin@storeal.j9wlyjg.mongodb.net/?retryWrites=true&w=majority"
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