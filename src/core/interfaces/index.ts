export interface IResultList<T> {
    results: T[],
    page: number,
    offset: number,
    total: number,
    total_pages: number
}

export enum eRoleAccessType {
    ADMIN = 'admin',
    RESTAURANT = 'restaurant',
    CUSTOMER = 'customer'
}

export type UserRoleTypes = 'restaurant' | 'admin'