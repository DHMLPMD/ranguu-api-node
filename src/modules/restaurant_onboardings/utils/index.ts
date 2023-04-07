export enum eRestaurantOnboardingSteps {
    BASIC_DATA = 'basic_data',
    ADDRESS_DATA = 'address',
    COMPLETED = 'completed'
}

export type RestaurantOnboardingStep = 'basic_data' | 'address' | 'completed'

export const validRestaurantOnboardingSteps = ['basic_data', 'address', 'completed']