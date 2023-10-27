import z from 'zod'
import { extractValidationData } from '../common/utils/extractValidationData.js'


export const usersSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    role: z.enum(["employee", "customer"])
})

export const validateUser = (data) => {
    const result = usersSchema.safeParse(data)
    const {hasError, errorMessage, data: userData} = extractValidationData(result)

    return {
        hasError, errorMessage, userData
    }
}

export const partialValidateUser = (data) => {
    const result = usersSchema.partial().safeParse(data)
    const {hasError, errorMessage, data: userData} = extractValidationData(result)

    return {
        hasError, errorMessage, userData
    }
}