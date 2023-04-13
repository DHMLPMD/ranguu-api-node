import { Prisma, RestaurantAddresses } from '@prisma/client'

export interface IRestaurantAddressRepository {
    createAddressOnboarding(params: Prisma.RestaurantAddressesCreateArgs): Promise<RestaurantAddresses>
    findOneByArgs(params: Prisma.RestaurantAddressesWhereInput, selectFields?: Prisma.RestaurantAddressesSelect, throwIfNotExists?: boolean): Promise<RestaurantAddresses | null>
    updateOne(params: Prisma.RestaurantAddressesUpdateArgs): Promise<boolean>

}