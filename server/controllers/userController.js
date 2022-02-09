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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUser({ email, password });

        res.status(200).json(user);
    } catch (err) {
        res.status(200).json({ message: 'Wrong email or password' });
    }
}

const getUserFavorites = async (req, res) => {
    const userId = req.params.id;
    const favorites = await userService.getUserFavorites(userId);

    res.json(favorites);
}

const updateUserFavorites = async (req, res) => {
    const userId = req.params.id;
    const movie = req.body.movie;

    await userService.updateUserFavorites(userId, movie);

    res.send('Updated');
}

const getUserRatings = async (req, res) => {
    const userId = req.params.id;
    const ratings = await userService.getUserRatings(userId);

    res.json(ratings);
}

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