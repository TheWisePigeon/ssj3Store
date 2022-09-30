import express, { Response, Request } from "express";
import dotenv from "dotenv"
dotenv.config()
import { connectToDB } from "./config";
const app = express()

app.get('/', (req: Request, res: Response)=>{
    return res.send('Hello bruh ok')
})


app.listen(3000, async ()=>{
    await connectToDB()
    console.log('App listening on port 3000');
})
