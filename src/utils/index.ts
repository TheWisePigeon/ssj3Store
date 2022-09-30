import bcrypt from "bcrypt"

const hashPassword = async (plainTextPassword: string)=>{
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10)
    return hashedPassword
}

const passwordIsValid = async (password: string, hashedPassword: string) : Promise<boolean>=>{
    return bcrypt.compareSync(password, hashedPassword)
}

export {
    hashPassword,
    passwordIsValid
}