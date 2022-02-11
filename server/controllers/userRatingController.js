import express from 'express';
const router = express.Router({mergeParams: true});

import * as userService from '../services/userService.js';

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
 *       description: User's ratings
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               data:
 *                  type: array
 *                  items:
 *                   type: object
 *                   properties:
 *                     movieId:
 *                       type: string
 *                     rating:
 *                       type: string
 *     500:
 *       description: Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 default: false
 *               message:
 *                 type: string
 *                 default: Something went wrong
*/

const getUserRatings = async (req, res) => {
    try{
        const userId = req.params.id;
        const ratings = await userService.getUserRatings(userId);
        
        res.json({success: true, data: ratings});
    }catch(err) {
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
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
 *       description: movieId and rating
 *       content:
 *         application/json:
 *           schema:
 *             properties:
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               message:
 *                 type: string
 *                 default: Updated
 *     500:
 *       description: Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 default: false
 *               message:
 *                 type: string
 *                 default: Something went wrong
*/

const updateUserRatings = async (req, res) => {
    try{
        const userId = req.params.id;
        const rating = req.body.rating;
        
        await userService.updateUserRatings(userId, rating);
        
        res.json({success: true, message: 'Updated'});
    }catch(err) {
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

router.get('/', getUserRatings);
router.put('/', updateUserRatings);

export default router;