import { Request, Response } from "express"

const login = ()=>{
    console.log('I got called')
}


const authService = {
    login
}

export default authService