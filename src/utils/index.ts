import bcrypt from "bcrypt"
import { User } from "../models"

const hashPassword = async (plainTextPassword: string)=>{
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10)
    return hashedPassword
}

const passwordIsValid = async (password: string, hashedPassword: string) : Promise<boolean>=>{
    return bcrypt.compareSync(password, hashedPassword)
}

const userIsAuthenticated = async (body:{ auth_id:string })=>{
    if (!body.auth_id){
        return false
    }
    const userAccount = await User.findById(body.auth_id)
    if (!userAccount){
        return false
    }
    return true
}

export {
    hashPassword,
    passwordIsValid,
    userIsAuthenticated
}