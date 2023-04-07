import Joi from 'joi'

export const validateCPF = (cpf: string, helper: Joi.CustomHelpers) => {
    let total = 0
    let rest

    if (cpf == "00000000000")
        return helper.message(`"${helper.state.path![0]}" Valor inválido` as any)

    for (let i = 1; i <= 9; i++) total = total + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    rest = (total * 10) % 11

    if ((rest == 10) || (rest == 11))
        rest = 0

    if (rest != parseInt(cpf.substring(9, 10)))
        return helper.message(`"${helper.state.path![0]}" CPF inválido` as any)

    total = 0
    for (let i = 1; i <= 10; i++) total = total + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    rest = (total * 10) % 11

    if ((rest == 10) || (rest == 11))
        rest = 0
    if (rest != parseInt(cpf.substring(10, 11)))
        return helper.message(`"${helper.state.path![0]}" CPF inválido` as any)
    return cpf
}

export const validateCNPJ = (value: string, helper: Joi.CustomHelpers) => {
    if (!value)
        return helper.message(`"${helper.state.path![0]}" CNPJ é obrigatório` as any)

    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

    if (!validTypes) return helper.message(`"${helper.state.path![0]}" Formato inválido` as any)

    if (isString) {

        const digitsOnly = /^\d{14}$/.test(value)
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

        if (!digitsOnly && !validFormat)
            return helper.message(`"${helper.state.path![0]}" CNPJ inválido` as any)
    }

    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    if (numbers.length !== 14)
        return helper.message(`"${helper.state.path![0]}" CNPJ inválido` as any)

    const items = [...new Set(numbers)]
    if (items.length === 1)
        return helper.message(`"${helper.state.path![0]}" CNPJ inválido` as any)

    const calc = (x: number) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0

        for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
        }

        const result = 11 - (sum % 11)

        return result > 9 ? 0 : result
    }

    const digits = numbers.slice(12)
    const digit0 = calc(12)

    if (digit0 !== digits[0])
        return helper.message(`"${helper.state.path![0]}" CNPJ inválido` as any)

    const digit1 = calc(13)
    if (digit1 !== digits[1])
        return helper.message(`"${helper.state.path![0]}" CNPJ inválido` as any)

    return value
}

export const validateDocument = (value: string, helper: Joi.CustomHelpers) => {
    if (!value)
        return helper.message(`"${helper.state.path![0]}" dados obrigatório` as any)

    return value.length > 11 ? validateCNPJ(value, helper) : validateCPF(value, helper)
}

export const verifyPathFiles = (url: string, helper: Joi.CustomHelpers) => {
    if (url != '' && url.indexOf('https://firebasestorage.googleapis.com/v0/b/parkbrasil-d1680.appspot.com') === -1)
        return helper.message(`"${helper.state.path![0]}" Solicitação não permitida, violação de requisitos de segurança no CDN` as any)
    return url
}

export const genRandomCode = (length: number): string => new Array(length).fill(null).map(() => Math.round(Math.random() * 9)).join('')