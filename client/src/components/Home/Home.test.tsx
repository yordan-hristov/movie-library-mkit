import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store'
import Home from "./Home"

const mockHeroSection = jest.fn();
const mockMovieImageCard = jest.fn();

jest.mock("./HeroSection/HeroSection", () => () => {
    mockHeroSection();
    return <></>;
});

jest.mock("../shared/MovieImageCard/MovieImageCard", () => (props: any) => {
    mockMovieImageCard(props);
    return <></>;
})

const mockStore = configureStore([]);

describe('Home Component', () => {
    beforeEach(() => {
        const store = mockStore({
            user: {
                user: {
                    favorites: [
                        { movieId: '1', imageUrl: 'imageUrl1' },
                        { movieId: '2', imageUrl: 'imageUrl2' },
                        { movieId: '3', imageUrl: 'imageUrl3' },
                    ]
                }
            }
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
    })

    it('Has heading', () => {
        const element = document.querySelector('.home-heading');
        expect(element).toHaveTextContent('My Favorites');
    });

    it('Renders HeroSection', () => {
        expect(mockHeroSection).toHaveBeenCalledTimes(1);
    });

    it('Renders MovieImageCard with props if favorites > 0', () => {
        expect(mockMovieImageCard).toHaveBeenNthCalledWith(1, { imageUrl: 'imageUrl1', movieId: '1' });
        expect(mockMovieImageCard).toHaveBeenNthCalledWith(2, { imageUrl: 'imageUrl2', movieId: '2' });
        expect(mockMovieImageCard).toHaveBeenNthCalledWith(3, { imageUrl: 'imageUrl3', movieId: '3' });
    });

    it('Shows "No favorites yet..." if favorites == 0', () => {
        const store = mockStore({
            user: {
                user: { favorites: [] }
            }
        });
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const element = document.querySelector('.home p');
        expect(element).toHaveTextContent('No favorites yet...');
    });

});