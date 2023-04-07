import { Admins } from "@prisma/client";

const admins: Partial<Admins>[] = [
    {
        name: 'Luis Paulo',
        email: 'luispaulo.degini@gmail.com',
        phone: "17988037000",
        password_hash: '123123',
        document: '42140916808',
    },
    {
        name: 'Diego Moraes',
        email: 'dh.moraes0407@gmail.com',
        phone: "17997311578",
        password_hash: '123123',
        document: '91390060004',
    }
]

export { admins }