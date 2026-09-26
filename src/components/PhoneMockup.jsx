import React from 'react';
import { ProfileCard } from './ProfileCard';

export const PhoneMockup = ({ profile, onShowToast, onOpenQr }) => {
  return (
    <div className="phone-perspective-container">
      <div className="phone-shell">
        <div className="phone-screen">
          {/* Top Dynamic Island / Camera Bar */}
          <div className="dynamic-island">
            <div className="island-camera"></div>
            <div className="island-sensor"></div>
          </div>

          {/* Profile Card Contents */}
          <ProfileCard 
            profile={profile} 
            onShowToast={onShowToast} 
            onOpenQr={onOpenQr} 
          />

          {/* Bottom Home Indicator Bar */}
          <div className="home-indicator"></div>
        </div>
      </div>
    </div>
  );
};
