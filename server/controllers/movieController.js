import express from 'express';
const router = express.Router({mergeParams: true});

import * as movieService from '../services/movieService.js';

const getMoviesWithQuery = async (req,res) => {
    const title = req.query.title;
    const movies = await movieService.getMoviesWithQuery(title);

    res.json(movies);
}

const getMovieById = async (req,res) => {
    const id = req.params.id;
    const movie = await movieService.getMovieById(id);

    res.json(movie)
}

router.get('/', getMoviesWithQuery);
router.get('/:id', getMovieById)

export default router;