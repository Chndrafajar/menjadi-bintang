import React, { useState } from 'react';
import { Sidebar } from '../components';

export default function Authenticated({ children }) {
  const [active, setActive] = useState(false);

  return (
    <div className="main-item">
      <div className="left">
        <Sidebar active={active} setActive={setActive} />
      </div>
      <div className="right">
        <main>{children}</main>
      </div>
    </div>
  );
}
