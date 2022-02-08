import React, { useState } from 'react';
import userService from '../../../services/userService';
import { ReactComponent as StarSvg } from './assets/star.svg'

import './StarsRating.scss';

type StarsRatingProps = {
    rating: string | null;
    movieId: string;
    userId: string;
}

const StarsRating = ({ rating, movieId, userId }: StarsRatingProps) => {
    const [hoveredStars, setHoveredStars] = useState(Number(rating));

    const handleClick = async (value: number) => {
        setHoveredStars(value);
        await userService.updateUserRatings(userId,{movieId,rating: value.toString()});
    }

    return <div className='star-rating'>
        {hoveredStars ?
            <div className='star-rating-stars' onClick={() => handleClick(NaN)}>
                <StarSvg className={`star-rating-star ${hoveredStars >= 1 ? 'filled' : ''}`} />
                <StarSvg className={`star-rating-star ${hoveredStars >= 2 ? 'filled' : ''}`} />
                <StarSvg className={`star-rating-star ${hoveredStars >= 3 ? 'filled' : ''}`} />
                <StarSvg className={`star-rating-star ${hoveredStars >= 4 ? 'filled' : ''}`} />
                <StarSvg className={`star-rating-star ${hoveredStars >= 5 ? 'filled' : ''}`} />
                <span className="star-rating-stars-tooltip">Remove rating</span>
            </div> :
            <>
                <StarSvg className='star-rating-star active' onClick={() => handleClick(1)}/>
                <StarSvg className='star-rating-star active' onClick={() => handleClick(2)}/>
                <StarSvg className='star-rating-star active' onClick={() => handleClick(3)}/>
                <StarSvg className='star-rating-star active' onClick={() => handleClick(4)}/>
                <StarSvg className='star-rating-star active' onClick={() => handleClick(5)}/>
            </>
        }

    </div>;
};

export default StarsRating;
