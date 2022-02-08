import React from 'react';

import './Notes.scss';

const Notes = () => {
  return <div className='movie-details-notes'>
      <div className="add-notes">
          <input type="text" className="add-notes-input" placeholder='Add note...'/>
          <button className="add-notes-button">Add</button>
      </div>
      <div className="notes">
          <div className="notes-note">
              <span>1.</span>
              <p>It was really boring</p>
          </div>
          <div className="notes-note">
              <span>2.</span>
              <p>It was really boring</p>
          </div>
          <div className="notes-note">
              <span>3.</span>
              <p>It was really boring</p>
          </div>
      </div>
  </div>;
};

export default Notes;
