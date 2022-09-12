import express, { Response, Request } from "express";
import auth from './routes/auth'

const app = express()

app.get('/', (req: Request, res: Response)=>{
    return res.send('Hello bruh ok')
})

app.use("/auth",auth)

app.listen(3000, ()=>{
    console.log('App listening on port 3000');
    
})
