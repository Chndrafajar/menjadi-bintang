import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFoundPages() {
  return (
    <div className="notfound">
      <div className="items">
        <img src="/images/notfound.svg" alt="" />
        <h3>Hmm Sepertinya Halaman Ini Tidak Ada!</h3>
        <div className="btn-back">
          <NavLink to="/">Back To Home</NavLink>
        </div>
      </div>
    </div>
  );
}
