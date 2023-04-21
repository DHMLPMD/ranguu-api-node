export interface IResultList<T> {
    results: T[],
    page: number,
    offset: number,
    total: number,
    total_pages: number
}

export type UserRoleTypes = 'restaurants'