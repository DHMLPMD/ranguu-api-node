import { TaxRegime } from "modules/restaurants/utils"

export interface IParamsCreateRestaurantBasicData {
    commom_name: string
    social_name: string
    document_number: string
    email: string
    phone: string
    tax_regime: TaxRegime
    responsible_name: string
    responsible_document: string
}