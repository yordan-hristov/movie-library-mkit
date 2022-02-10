import express from 'express';
const router = express.Router({ mergeParams: true });
import Joi from 'joi';

import * as userService from '../services/userService.js';
import userNoteController from './userNoteController.js'

const userSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email is not valid'
        }),
    password: Joi
        .string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 symbols',
            'any.required': 'Password is required'
        }),
});

/**
 * @swagger
 * /user/register:
 *  post:
 *   summary: Create user
 *   description: Creates user and returns it if inputs are valid
 *   tags:
 *     - user
 *   requestBody:
 *       description: Valid email and password
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *   responses:
 *     200:
 *       description: User
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
*/

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validation = userSchema.validate({ email, password });
        if (validation.error) return res.json({ message: validation.error.message })

        const user = await userService.createUser({ email, password });
        res.status(201).json(user);
    } catch (err) {
        res.status(200).json({ message: 'Email is already used!' });
    }
};

/**
 * @swagger
 * /user/login:
 *  post:
 *   summary: Login user
 *   description: Returns user if email and password are valid
 *   tags:
 *     - user
 *   requestBody:
 *       description: Valid email and password
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *   responses:
 *     200:
 *       description: User
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
*/

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUser({ email, password });

        res.status(200).json(user);
    } catch (err) {
        res.status(200).json({ message: 'Wrong email or password' });
    }
}

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
    const userId = req.params.id;
    const favorites = await userService.getUserFavorites(userId);

    res.json(favorites);
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
 *       description: userId, movieId and imageUrl
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               userId:
 *                 type: string
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
    const userId = req.params.id;
    const movie = req.body.movie;

    await userService.updateUserFavorites(userId, movie);

    res.send('Updated');
}

/**
 * @swagger
 * /user/:id/ratings:
 *  get:
 *   summary: Get user's ratings
 *   description: Returns an array with user's ratings
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
 *                rating:
 *                  type: string
*/

const getUserRatings = async (req, res) => {
    const userId = req.params.id;
    const ratings = await userService.getUserRatings(userId);

    res.json(ratings);
}

/**
 * @swagger
 * /user/:id/ratings:
 *  put:
 *   summary: Update user's ratings
 *   description: Adds or removes rating from user's ratings
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: user's id.
 *       schema:
 *         type: string
 *   requestBody:
 *       description: userId, movieId and rating
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               userId:
 *                 type: string
 *               rating:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: string
 *                   rating:
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

const updateUserRatings = async (req, res) => {
    const userId = req.params.id;
    const rating = req.body.rating;

    await userService.updateUserRatings(userId, rating);

    res.send('Updated');
}

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/favorites', getUserFavorites);
router.put('/:id/favorites', updateUserFavorites);
router.get('/:id/ratings', getUserRatings);
router.put('/:id/ratings', updateUserRatings);

router.use('/:id/notes', userNoteController)

export default router;

