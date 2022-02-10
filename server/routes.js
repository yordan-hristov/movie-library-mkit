import express from 'express';
const router = express.Router();

import userController from './controllers/userController.js';
import movieController from './controllers/movieController.js';

router.use('/users', userController);
router.use('/movies', movieController);

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          favorites:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                movieId:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *          ratings:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                movieId:
 *                  type: string
 *                rating:
 *                  type: string
 *          notes:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                movieId:
 *                  type: string
 *                note:
 *                  type: string
 *                _id:
 *                  type: string
 *      Movie:
 *        type: object
 *        properties:
 *          id:
 *            type: string 
 *          title:
 *            type: string 
 *          year:
 *            type: string 
 *          runtime:
 *            type: string 
 *          url:
 *            type: string 
 *          summary:
 *            type: string 
 *          image:
 *            type: string 
 *          genres:
 *            type: array
 *            items:
 *              type: string 
 */

export default router;