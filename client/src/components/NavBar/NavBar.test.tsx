import { fireEvent, getByText, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../store/store"
import NavBar from "./NavBar"

const mockSearchBar = jest.fn();
jest.mock("../shared/SearchBar/SearchBar", () => (props: { shouldNavigate: boolean }) => {
    mockSearchBar(props);
    return <></>;
});

describe('NavBar Componenet', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar />
                </BrowserRouter>
            </Provider>
        )
    });

    it('Has title', () => {
        const element = document.querySelector('.nav-bar-title');
        expect(element).toHaveTextContent('My Movie Collection');
    });

    it('Navigates on title click', () => {
        const element = document.querySelector('.nav-bar-title');
        fireEvent.click(element!);
        expect(window.location.pathname).toBe('/home');
    })

    it('Renders SearchBar with shouldNavigate=true', () => {
        expect(mockSearchBar).toHaveBeenCalledWith({ shouldNavigate: true });
    });
})