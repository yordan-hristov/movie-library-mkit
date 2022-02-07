import express from 'express';
const router = express.Router();

import userController from './controllers/userController.js';

router.use('/users', userController);

export default router;