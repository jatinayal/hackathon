import React from 'react';
import { Rocket } from 'lucide-react';

/**
 * Floating Rocket Trigger Pill
 * Allows persistent access to re-launch or view the revealed flash discount.
 */
export const FloatingRocketTrigger = ({ onClick, isRevealed = false }) => {
  return (
    <button
      onClick={onClick}
      className="floating-rocket-trigger"
      aria-label="Open Rocket Flash Sale"
    >
      <div className="floating-rocket-icon-wrap">
        <Rocket size={18} color="#00f0ff" />
        <span className="floating-rocket-ping" />
      </div>

      <div className="floating-rocket-details">
        <span className="floating-rocket-title">
          <span>{isRevealed ? '62% OFF' : 'FLASH SALE'}</span> ⚡
        </span>
        <span className="floating-rocket-sub">
          {isRevealed ? 'Code: THUNDER60' : 'Launch Rocket'}
        </span>
      </div>
    </button>
  );
};
