import express from 'express'
import authService from "../../services/Auth"
const router = express.Router()

router.route("/login").get(authService.login) 

export default router 