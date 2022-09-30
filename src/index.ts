import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import { User, Store, Product } from "./models"
import { hashPassword, passwordIsValid } from "./utils"
dotenv.config()
import { connectToDB } from "./config";
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/register', async (req: Request, res: Response) => {
    let { username, password } = req.body
    password = await hashPassword(password)
    const newUser = new User({ username, password })
    newUser.save((err, result) => {
        if (err) {
            return res.status(500).send({
                "message": `Something went wrong :( \n ${err.message}`
            })
        }
        console.log(`User registered ${result.username}`)
        return res.status(200).send({
            "message": "Registration completed :)",
            "data": result
        })
    })
})

app.post('/login', async (req: Request, res: Response) => {
    let { username, password } = req.body
    const userAccount = await User.findOne({
        username: username
    })
    if (!userAccount) {
        return res.status(404).send({
            "message": `User ${username} not found :(`
        })
    }
    if (!(await passwordIsValid(password, userAccount.password as string))) {
        return res.status(400).send({
            "message": "Invalid password"
        })
    }
    return res.status(200).send({
        "message": "Login succcessfull",
        "data": userAccount.id
    })
})


app.listen(3000, async () => {
    await connectToDB()
    console.log('App listening on port 3000');
})
