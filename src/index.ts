import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import { User, Store, Product } from "./models"
import { hashPassword, passwordIsValid, userIsAuthenticated } from "./utils"
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

app.post('/store/create', async (req: Request, res: Response) => {
    if (!userIsAuthenticated(req.body)) {
        return res.status(401).send({
            "message": "User not authenticated"
        })
    }
    const { name, auth_id, isMain, description } = req.body

    const newStore = new Store({ name, owner: auth_id, isMain, description })

    newStore.save((err, result) => {
        if (err) {
            return res.status(500).send({
                "message": `Something went wrong ${err.message}`
            })
        }
        return res.status(200).send({
            "message": "Store created",
            "data": result
        })

    })
})

app.get('/user/stores', async (req: Request, res: Response) => {
    if (!userIsAuthenticated(req.body)) {
        return res.status(401).send({
            "message": "User not authenticated"
        })
    }
    try {
        const userStores = await Store.find({
            owner: req.body.auth_id
        })
        return res.status(200).send({
            "message": "user stores fetched",
            "data": userStores
        })
    } catch (error) {
        return res.status(500).send({
            "message": "Something went wrong"
        })
    }

})

app.get('/stores', async (_req: Request, res: Response) => {
    Store.find((err, result) => {
        if (err) {
            return res.status(500).send({
                "message": `Something went wrong ${err.message}`
            })
        }
        return res.status(200).send({
            "message": "Stores fetched",
            "data": result
        })
    })
})

app.post('/store/info', async (req: Request, res: Response) => {
    if (!userIsAuthenticated(req.body)) {
        return res.status(401).send({
            "message": "User not authenticated"
        })
    }
    try {
        const { storeId } = req.body
        const storeInfo = await Store.findById(storeId)
        if (!storeInfo) {
            return res.status(404).send({
                "message": "Store not found"
            })
        }
        return res.status(200).send({
            "message": "Store informations fetched",
            "data": storeInfo
        })
    } catch (error) {
        return res.status(500).send({
            "message": `Something went wrong ${error}`
        })
    }
})







app.listen(3000, async () => {
    await connectToDB()
    console.log('App listening on port 3000');
})
