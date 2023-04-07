import { Admins, Prisma } from "@prisma/client";

const admins: Partial<Admins>[] = [
    {
        name: 'Luis Paulo',
        email: 'luisdegini.younner@gmail.com',
        phone_number: "17988037000",
        password: '123123',
        cpf: '42140916808',
        is_phone_validated: true
    }
]

export { admins }