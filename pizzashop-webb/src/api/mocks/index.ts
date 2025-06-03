import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount'
import { getMonthRevenueMock } from './get-month-revenue'
import { getMonthOrdersAmountMock } from './get-month-orders-amount'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mocks'
import { getPopularProductsMock } from './get-popular-products-mock'
import { UpdateProfileMock } from './update-profile-mock'
import { getProfileMock } from './get-profile-mock'
import { GetManagedRestaurantMock } from './get-managed-restaurant-mock'

export const worker = setupWorker(signInMock, registerRestaurantMock, getDayOrdersAmountMock, getMonthCanceledOrdersAmountMock, getMonthRevenueMock, getMonthOrdersAmountMock, getDailyRevenueInPeriodMock, getPopularProductsMock, UpdateProfileMock, getProfileMock, GetManagedRestaurantMock)

export async function enableMSW() {
    if (env.MODE !== 'test') {
        return
    }
    
    await worker.start()
}