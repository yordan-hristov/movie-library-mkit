import express from 'express';
const router = express.Router({mergeParams: true});

import * as movieService from '../services/movieService.js';

const getMoviesWithQuery = async (req,res) => {
    const title = req.query.title;
    const movies = await movieService.getMoviesWithQuery(title);

    res.json(movies);
}

router.get('/', getMoviesWithQuery);

export default router;