import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SignIn } from "./sign-in"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { HelmetProvider } from "react-helmet-async"

describe('SignIn', () => {
    it('should set default email input value if email is present on search params', () => {
        const wrapper = render(
                <>
                <SignIn />
                </>,

                {
                    wrapper: ({ children }) => {
                    return (
                        <HelmetProvider>
                            <MemoryRouter initialEntries={['/about']}>
                                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                            </MemoryRouter>
                        </HelmetProvider>
                    )
                }}
        )

       wrapper.debug() 
    })
})