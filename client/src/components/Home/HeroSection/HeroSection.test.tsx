import { fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../../store/store"
import * as userSlice from "../../../store/user/userSlice"
import * as searchQuerySlice from "../../../store/searchQuery/searchQuerySlice"
import HeroSection from "./HeroSection"

describe('HeroSection Component', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HeroSection />
                </BrowserRouter>
            </Provider>
        )
    })

    it('Has heading', () => {
        const element = document.querySelector('.hero-section-heading');
        expect(element).toHaveTextContent('My Movie Library');
    });

    it('Has text', () => {
        const element = document.querySelector('.hero-section-text');
        expect(element).toHaveTextContent('Manage and review your favorite movies');
    });

    it('Has Search button', () => {
        const element = document.querySelector('.hero-section-button');
        expect(element).toHaveTextContent('Search');
    });

    it('Has Logout button', () => {
        const element = document.querySelector('.logout');
        expect(element).toHaveTextContent('Logout');
    });

    it('Navigates to "/search" on Search click', () => {
        const element = document.querySelector('.hero-section-button');
        fireEvent.click(element!);
        expect(window.location.pathname).toBe('/search');
    });

    it('Dispatches removeUser and setQuery on Logout click', () => {
        const mockRemoveUser = jest.spyOn(userSlice, 'removeUser');
        const mockSetQuery = jest.spyOn(searchQuerySlice, 'setSearchQuery');
        const element = document.querySelector('.logout');
        fireEvent.click(element!);
        expect(mockRemoveUser).toHaveBeenCalledTimes(1);
        expect(mockSetQuery).toHaveBeenCalledWith('');
    })
})