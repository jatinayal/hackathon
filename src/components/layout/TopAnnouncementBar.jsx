import React from 'react';
import { Rocket, Zap } from 'lucide-react';

/**
 * Top Promotional Announcement Bar
 * Displays active Hackathon 6.0 flash sale and triggers the rocket experience.
 */
export const TopAnnouncementBar = ({ onLaunchRocket }) => {
  return (
    <aside className="top-announcement-bar" aria-label="Announcement">
      <div className="top-bar-inner">
        <div className="top-bar-badge">
          <Zap size={12} fill="#ffffff" />
          <span>Thunder 6.0 Flash Deal</span>
        </div>

        <span className="top-bar-text">
          Launch the <strong>STRIKE Hyper-Rocket</strong> to unlock exclusive flash discounts up to <strong>62% OFF</strong>!
        </span>

        <button
          onClick={onLaunchRocket}
          className="top-bar-btn"
          aria-label="Launch Rocket to Reveal Discount"
        >
          <Rocket size={13} />
          <span>Launch Rocket</span>
        </button>
      </div>
    </aside>
  );
};
