import express from 'express';
const router = express.Router();

import userController from './controllers/userController.js';
import movieController from './controllers/movieController.js';

router.use('/users', userController);
router.use('/movies', movieController);

export default router;