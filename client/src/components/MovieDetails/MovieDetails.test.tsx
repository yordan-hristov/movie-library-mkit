import { render } from "@testing-library/react"
import MovieDetails from "./MovieDetails"
import { Provider } from 'react-redux';
import movieService from '../../services/movieService';
import store from '../../store/store';


describe('MovieDetails Component', () => {
    it('Calls getMovieById', () => {
        const mockGetMovie = jest.spyOn(movieService, 'getMovieById');
        render(
            <Provider store={store}>
                <MovieDetails />
            </Provider>
        );

        expect(mockGetMovie).toHaveBeenCalledTimes(1);
    });
})



