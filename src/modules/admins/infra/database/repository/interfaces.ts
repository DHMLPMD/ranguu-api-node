import { Admins, Prisma } from "@prisma/client";

export interface IAdminRepository {
    findOneByArgs(args: Prisma.AdminsFindFirstArgs, throwIfNotExists?: boolean): Promise<Admins | null>
}