import express from 'express';
const router = express.Router({mergeParams: true});

import * as userService from '../services/userService.js';

/**
 * @swagger
 * /user/:id/favorites:
 *  get:
 *   summary: Get user's favorite movies
 *   description: Returns an array with user's favorite movies
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: user's id.
 *       schema:
 *         type: string
 *   tags:
 *     - user
 *   responses:
 *     200:
 *       description: User
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *                movieId:
 *                  type: string
 *                imageUrl:
 *                  type: string
*/

const getUserFavorites = async (req, res) => {
    try{
        const userId = req.params.id;
        const favorites = await userService.getUserFavorites(userId);
        
        res.json({success: true, data: favorites});
    }catch(err) {
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

/**
 * @swagger
 * /user/:id/favorites:
 *  put:
 *   summary: Update user's favorite movies
 *   description: Adds or removes movie from user's favorites
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: user's id.
 *       schema:
 *         type: string
 *   requestBody:
 *       description: movieId and imageUrl
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               movie:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *   tags:
 *     - user
 *   responses:
 *     200:
 *       description: "Updated"
 *       content:
 *         text:
 *           schema:
 *             type: string
*/

const updateUserFavorites = async (req, res) => {
    try{
        const userId = req.params.id;
        const movie = req.body.movie;
        
        await userService.updateUserFavorites(userId, movie);

        res.json({success: true, message: 'Updated'});
    }catch(err){
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

router.get('/', getUserFavorites);
router.put('/', updateUserFavorites);

export default router;