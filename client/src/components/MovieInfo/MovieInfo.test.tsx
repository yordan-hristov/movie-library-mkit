import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import userService from '../../services/userService';
import MovieInfo from './MovieInfo';

const mockStore = configureStore([]);

const mockMovieImageCard = jest.fn();
jest.mock("../shared/MovieImageCard/MovieImageCard", () => (props: any) => {
    mockMovieImageCard(props);
    return <></>;
});

describe('MovieInfo Component', () => {
    beforeEach(() => {
        const store = mockStore({
            user: {
                user: {
                    favorites: [
                        { movieId: 'movieId', imageUrl: 'imageUrl' },
                    ],
                    _id: 'userId'
                }
            }
        });

        render(
            <Provider store={store}>
                <MovieInfo
                    movie={{
                        id: 'movieId',
                        image: 'imageUrl',
                        title: 'movieTitle',
                        year: '2020-19-10',
                        runtime: 'movieRuntime',
                        genres: ['genre1', 'genre2'],
                        summary: 'movieSummary',
                        url: 'movieUrl',
                    }}
                />
            </Provider>
        );

    });

    it('Calls MovieImageCard with proper info', () => {
        expect(mockMovieImageCard).toHaveBeenCalledWith({imageUrl: "imageUrl", movieId: "movieId"});
    });

    it('Shows proper title', () => {
        const element = document.querySelector('.movie-info-title');
        expect(element).toHaveTextContent('movieTitle');
    });

    it('Shows proper year', () => {
        const element = document.querySelector('.movie-info-title span');
        expect(element).toHaveTextContent('(2020)');
    });

    it('Shows proper genres', () => {
        const element = document.querySelector('.movie-info-genres');
        expect(element).toHaveTextContent('genre1, genre2');
    });

    it('Shows proper runtime', () => {
        const element = document.querySelector('.movie-info-genres span');
        expect(element).toHaveTextContent('movieRuntime');
    });

    it('Shows proper summary', () => {
        const element = document.querySelector('.movie-info-summary');
        expect(element).toHaveTextContent('movieSummary');
    });

    it('Sets proper link on a', () => {
        const element = document.querySelector('.movie-info-link');
        expect(element).toHaveAttribute('href', 'movieUrl');
    });

    it('Shows proper button text', () => {
        const element = document.querySelector('.movie-info-button');
        expect(element).toHaveTextContent('Remove from Favorites');
    });

    it('Calls updateUserFavorites on button click', () => {
        const mockUpdateFavorites = jest.spyOn(userService, 'updateUserFavorites');
        const element = document.querySelector('.movie-info-button');
        fireEvent.click(element!);

        expect(mockUpdateFavorites).toHaveBeenCalledWith("userId", {id: "movieId", imageUrl: "imageUrl"});
    })

})