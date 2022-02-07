import express from 'express';
const router = express.Router({mergeParams: true});

import * as userService from '../services/userService.js';

const registerUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.createUser({email, password});
        res.status(201).json(user);
    }catch(err) {
        res.status(200).json({message: 'Email is already used!'});
    }
};

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUser({email,password});
        
        res.status(200).json(user);
    }catch(err) {
        res.status(200).json({message: 'Wrong email or password'});
    }
}

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;