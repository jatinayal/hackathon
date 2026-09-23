import React from 'react';
import strikePlusImg from '../../assets/images/strikePlus.png';
import strikeUltraImg from '../../assets/images/strikeUltra.png';

export const MembershipBanner = ({ type = 'silver' }) => {
  const isGold = type === 'gold';
  const bannerSrc = isGold ? strikeUltraImg : strikePlusImg;
  const planName = isGold ? 'Strike Ultra' : 'Strike Plus';

  return (
    <img
      src={bannerSrc}
      alt={planName}
      className="plan-banner-bg"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
      }}
      loading="lazy"
    />
  );
};
