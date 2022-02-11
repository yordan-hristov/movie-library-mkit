import express from 'express';
const router = express.Router({mergeParams: true});

import * as userService from '../services/userService.js';

/**
 * @swagger
 * /user/:id/notes:
 *  get:
 *   summary: Get user's notes
 *   description: Returns an array with user's notes
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
 *                note:
 *                  type: string
 *                _id:
 *                  type: string
*/

const getUserNotes = async (req,res) => {
    try{
        const id = req.params.id;
        const notes = await userService.getUserNotes(id);
        
        res.json({success: true, data: notes});
    }catch(err) {
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

/**
 * @swagger
 * /user/:id/notes:
 *  post:
 *   summary: Create note
 *   description: Create note
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: user's id.
 *       schema:
 *         type: string
 *   requestBody:
 *       description: movieId and note
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               note:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: string
 *                   note:
 *                     type: string
 *   tags:
 *     - user
 *   responses:
 *     200:
 *       description: "Created"
 *       content:
 *         text:
 *           schema:
 *             type: string
*/

const createNote = async (req,res) => {
    try{
        const id = req.params.id;
        const {movieId, note} = req.body;
        await userService.createNote(id,movieId,note);
        
        res.status(201).json({succes: true, message: 'Created'});
    }catch(err) {
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

/**
 * @swagger
 * /user/:id/notes/:noteId:
 *  delete:
 *   summary: Delete note
 *   description: Delete note
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: user's id.
 *       schema:
 *         type: string
 *     - in: path
 *       name: noteId
 *       required: true
 *       description: note's id.
 *       schema:
 *         type: string
 *   tags:
 *     - user
 *   responses:
 *     200:
 *       description: "Deleted"
 *       content:
 *         text:
 *           schema:
 *             type: string
*/

const deleteNote = async (req,res) => {
    try{
        const userId = req.params.id;
        const noteId = req.params.noteId;
        await userService.deleteNote(userId, noteId);
        
        res.json({succes: true, message: 'Deleted'});
    }catch(err){
        res.status(500).json({success: false, message: 'Something went wrong'});
    }
}

router.get('/', getUserNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);

export default router;