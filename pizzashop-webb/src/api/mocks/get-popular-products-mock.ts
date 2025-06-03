import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<never, never, GetPopularProductsResponse>('/metrics/popular-products', () => {
    return HttpResponse.json([
        {
            product: 'Pizza Margherita',
            amount: 100,
        },
        {
            product: 'Pizza Pepperoni',
            amount: 80,
        },
        {
            product: 'Pizza Quattro Stagioni',
            amount: 60,
        },
        {
            product: 'Pizza Funghi',
            amount: 50,
        },
        {
            product: 'Pizza Capricciosa',
            amount: 40,
        },
    ])
})