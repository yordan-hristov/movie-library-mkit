import express from 'express';
const router = express.Router({ mergeParams: true });
import Joi from 'joi';

import * as userService from '../services/userService.js';
import userFavoriteController from './userFavoriteController.js';
import userRatingController from './userRatingController.js';
import userNoteController from './userNoteController.js';

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

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use('/:id/favorites', userFavoriteController);
router.use('/:id/ratings', userRatingController);
router.use('/:id/notes', userNoteController);

export default router;

