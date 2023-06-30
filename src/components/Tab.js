// src/components/Tab.js
import React from 'react';

function Tab({ title, activeTab, onClick }) {
  return (
    <button onClick={onClick} className={activeTab === title ? 'active' : ''}>
      {title}
    </button>
  );
}

export default Tab;
