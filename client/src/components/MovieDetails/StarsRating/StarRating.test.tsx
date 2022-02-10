import { fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../../../store/store"
import userService from '../../../services/userService'
import StarsRating from "./StarsRating"

describe('StarRating Component', () => {
    describe('Rating is 1-5', () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <StarsRating
                        rating={'3'}
                        movieId={'movieId'}
                        userId={'userId'}
                    />
                </Provider>
            );
        });

        it('Has stars with "filled" class equal to rating', () => {
            const stars = document.querySelectorAll('.star-rating-star');
            expect(stars[0]).toHaveClass('filled');
            expect(stars[1]).toHaveClass('filled');
            expect(stars[2]).toHaveClass('filled');
            expect(stars[3]).not.toHaveClass('filled');
            expect(stars[4]).not.toHaveClass('filled');
        });

        it('Has span with textContent "Remove rating"', () => {
            const element = document.querySelector('.star-rating-stars-tooltip');
            expect(element).toHaveTextContent('Remove rating');
        });

        it('Updates userRating on click with rating=NaN', async () => {
            const mockUpdateRatings = jest.spyOn(userService, 'updateUserRatings');
            const element = document.querySelector('.star-rating-stars');
            fireEvent.click(element!);

            expect(mockUpdateRatings).toHaveBeenCalledWith('userId', { movieId: 'movieId', rating: "NaN" });
        });
    });

    describe('Rating is null', () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <StarsRating
                        rating={null}
                        movieId={'movieId'}
                        userId={'userId'}
                    />
                </Provider>
            );
        });

        it('Has stars with "active" class', () => {
            const stars = document.querySelectorAll('.star-rating-star');
            expect(stars[0]).toHaveClass('active');
            expect(stars[1]).toHaveClass('active');
            expect(stars[2]).toHaveClass('active');
            expect(stars[3]).toHaveClass('active');
            expect(stars[4]).toHaveClass('active');
        });

        it('Does not have span with textContent "Remove rating"', () => {
            const element = document.querySelector('.star-rating span');
            expect(element).not.toBeInTheDocument();
        });

        it('Updates userRating on click with rating=1-5', async () => {
            const mockUpdateRatings = jest.spyOn(userService, 'updateUserRatings');
            const stars = document.querySelectorAll('.star-rating-star');
            fireEvent.click(stars[2]);

            expect(mockUpdateRatings).toHaveBeenCalledWith('userId', { movieId: 'movieId', rating: "3" });
        });

    });

})