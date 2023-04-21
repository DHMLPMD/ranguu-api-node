export interface ITokenRepository {
    createOne(entity: string, entityId: string, token: string): Promise<void>
}