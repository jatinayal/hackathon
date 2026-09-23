import React from 'react';
import { Wrench } from 'lucide-react';

export const FloatingToolButton = () => {
  return (
    <button 
      className="floating-tool-btn" 
      title="Strike Settings & Tools"
      aria-label="Settings and Tools"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Wrench size={20} />
    </button>
  );
};
