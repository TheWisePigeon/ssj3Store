import express, { Response, Request } from "express";

const app = express()

app.get('/', (req: Request, res: Response)=>{
    return res.send('Hello bruh ok')
})


app.listen(3000, ()=>{
    console.log('App listening on port 3000');
    
})
