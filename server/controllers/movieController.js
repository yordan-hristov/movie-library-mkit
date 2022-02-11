import express from 'express';
const router = express.Router({mergeParams: true});

import * as movieService from '../services/movieService.js';

/**
 * @swagger
 * /movies?title={title}:
 *  get:
 *   summary: Get movies by query title
 *   description: Make get request to movie api and return array of movies based on query
 *   parameters:
 *     - in: query
 *       name: title
 *       required: true
 *       description: title query.
 *       schema:
 *         type: string
 *   tags:
 *     - movies
 *   responses:
 *     200:
 *       description: Movies
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Movie'
*/

const getMoviesWithQuery = async (req,res) => {
    try{
        const title = req.query.title;
        const movies = await movieService.getMoviesWithQuery(title);
        
        res.json({success: true, data: movies});
    }catch(err){
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

/**
 * @swagger
 * /movies/:id:
 *  get:
 *   summary: Get movie by id
 *   description: Make get request to movie api and return movie
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: movies's id.
 *       schema:
 *         type: string
 *   tags:
 *     - movies
 *   responses:
 *     200:
 *       description: Movie
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
*/

const getMovieById = async (req,res) => {
    try{
        const id = req.params.id;
        const movie = await movieService.getMovieById(id);
        
        res.json({success: true,data: movie});
    }catch(err){
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

router.get('/', getMoviesWithQuery);
router.get('/:id', getMovieById)

export default router;