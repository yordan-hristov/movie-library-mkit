import React from 'react'

import './Note.scss';

type NoteProps = {
    index: number;
    text: string;
    noteId: string;
    handleDelete: (noteId: string) => void;
}

const Note = ({index, text, noteId, handleDelete}: NoteProps) => {
    const handleClick = () => {
        handleDelete(noteId);
    }

    return (
        <div className="note">
            <span>{index + 1}.</span>
            <p>{text}</p>
            <div onClick={handleClick}>❌</div>
        </div>
    )
}


export default Note