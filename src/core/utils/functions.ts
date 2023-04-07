import { hash } from "bcryptjs"

const PASSWORD_HASH_SALT = 10

export const hashPassword = async (rawPassword: string) => await hash(rawPassword, PASSWORD_HASH_SALT)

export const excludeField = <T, Key extends keyof T>(domain: T, keys: Key[]): Omit<T, Key> => {
    for(let key of keys)
        delete domain[key]
    return domain
}