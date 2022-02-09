import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userService from '../../../services/userService';
import { getUserNotes } from '../../../store/user/userSlice';
import Note from './Note/Note';

import './Notes.scss';

type NotesProps = {
    notes: [{ movieId: string, note: string, _id: string }];
    movieId: string;
    userId: string;
}

const Notes = ({ notes, movieId, userId }: NotesProps) => {
    const dispatch = useDispatch();
    const [noteInput, setNoteInput] = useState('');

    const handleAddClick = async () => {
        if (noteInput.length === 0) return;

        await userService.createNote(userId, movieId, noteInput);
        dispatch(getUserNotes(userId));
        setNoteInput('');
    }

    const handleDeleteClick = async (noteId: string) => {
        await userService.deleteNote(userId, noteId);
        dispatch(getUserNotes(userId));
    }

    return <div className='movie-details-notes'>
        <div className="add-notes">
            <input type="text" className="add-notes-input" placeholder='Add note...' value={noteInput} onChange={(e) => setNoteInput(e.target.value)} />
            <button className="add-notes-button" onClick={handleAddClick}>Add</button>
        </div>
        <div className="notes">
            {notes.length > 0 &&
                notes.map((n, i) => {
                    return <Note
                        index={i}
                        text={n.note}
                        key={i}
                        noteId={n._id}
                        handleDelete={handleDeleteClick}
                    />
                })}
        </div>
    </div>;
};

export default Notes;
