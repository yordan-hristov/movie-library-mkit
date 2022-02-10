import { fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../../store/store"
import SearchBar from "./SearchBar"

describe('SearchBar Component', () => {
    it('Does not navigate on Search click if shouldNavigte=false', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBar shouldNavigate={false} />
                </BrowserRouter>
            </Provider>
        );

        const element = document.querySelector('.search-bar-button');
        fireEvent.click(element!);
        expect(window.location.pathname).toBe('/');
    });

    it('Navigates on Search click if shouldNavigte=true', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SearchBar shouldNavigate={true} />
                </BrowserRouter>
            </Provider>
        );

        const element = document.querySelector('.search-bar-button');
        fireEvent.click(element!);
        expect(window.location.pathname).toBe('/search');
    });
})