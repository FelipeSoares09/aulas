import { createBrowserRouter } from "react-router-dom"

import { Dashboard } from "./pages/app/dashboard/dashboard"
import { SignIn } from "./pages/auth/sign-in"
import { AppLayout } from "./pages/_layouts/app"
import { AuthLayout } from "./pages/_layouts/auth"
import { SignUp } from "./pages/auth/sing-up"
import { Orders } from "./pages/app/orders/orders"
import { NotFound } from "./pages/notfound"
import { Error } from "./pages/error"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Dashboard />},
            { path: '/orders', element: <Orders /> }
        ],
    },

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/sign-in', element: <SignIn />},
            { path: '/sign-up', element: <SignUp />}
        ],
    },
    {
        path: '*',
        element: <NotFound />
    }
])