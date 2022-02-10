import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import movieService from "../../services/movieService";
import Search from "./Search";

const mockSearchBar = jest.fn();
jest.mock("../shared/SearchBar/SearchBar", () => (props: { shouldNavigate: boolean }) => {
    mockSearchBar(props);
    return <></>;
});

const mockStore = configureStore([]);

describe('Search Component', () => {
    // beforeEach(() => {
    //     const store = mockStore({
    //         searchQuery: {
    //             searchQuery: 'testQuery'
    //         }
    //     });

    //     render(
    //         <Provider store={store}>
    //             <Search />
    //         </Provider>
    //     );
    // });

    it('Renders SearchBar with shouldNavigate=false', () => {
        const store = mockStore({
            searchQuery: {
                searchQuery: 'testQuery'
            }
        });

        render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        expect(mockSearchBar).toHaveBeenCalledWith({ shouldNavigate: false });
    });

    it('Calls getMovieWithQuery if query.length > 0', () => {
        const store = mockStore({
            searchQuery: {
                searchQuery: 'testQuery'
            }
        });

        const mockGetMovies = jest.spyOn(movieService, 'getMoviesWithQuery');

        render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        expect(mockGetMovies).toHaveBeenCalledWith('testQuery');
    })
});