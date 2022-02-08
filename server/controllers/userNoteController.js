import express from 'express';
const router = express.Router({mergeParams: true});

import * as userService from '../services/userService.js';

const getUserNotes = async (req,res) => {
    const id = req.params.id;
    const notes = await userService.getUserNotes(id);

    res.json(notes)
}

const createNote = async (req,res) => {
    const id = req.params.id;
    const {movieId, note} = req.body;
    await userService.createNote(id,movieId,note);

    res.send('Created');
}

const deleteNote = async (req,res) => {
    const userId = req.params.id;
    const noteId = req.params.noteId;
    await userService.deleteNote(userId, noteId);

    res.send('Deleted');
}

router.get('/', getUserNotes);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);

export default router;