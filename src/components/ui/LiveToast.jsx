import React, { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';

const RECENT_ENROLLMENTS = [
  { name: 'Viswadatta', action: 'just joined Strike! 🎉' },
  { name: 'Subhajit', action: 'just joined Strike! 🚀' },
  { name: 'Priyanshu', action: 'enrolled in Strike Ultra! ✨' },
  { name: 'Ananya Sharma', action: 'just joined Thunder 100 Days! ⚡' },
  { name: 'Rohan Gupta', action: 'enrolled in DSA + GenAI Combo! 🔥' }
];

export const LiveToast = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_ENROLLMENTS.length);
        setIsVisible(true);
      }, 400);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = RECENT_ENROLLMENTS[currentIndex];

  return (
    <div className="live-toast-wrapper">
      <div className="live-toast">
        <div className="toast-avatar">
          <User size={18} />
        </div>
        <div className="toast-content">
          <span className="toast-name">{current.name}</span>
          <span className="toast-action">{current.action}</span>
        </div>
        <button
          className="toast-close-btn"
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
