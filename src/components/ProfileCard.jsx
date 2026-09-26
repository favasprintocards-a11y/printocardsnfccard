import React from 'react';
import { Phone, Mail, Link as LinkIcon, BookmarkPlus, Share2 } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';
import confetti from 'canvas-confetti';

const SocialIcon = ({ social, type, color }) => {
  const iconImg = social?.image || (typeof type === 'string' && (type.includes('/') || type.includes('.')) ? type : null);

  if (iconImg) {
    return (
      <img 
        src={iconImg} 
        alt={social?.name || 'Social Icon'} 
        style={{ width: '30px', height: '30px', objectFit: 'contain', display: 'block' }} 
      />
    );
  }

  switch (type) {
    case 'whatsapp':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={color}>
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.333 5.001L2 22l5.129-1.344c1.464.799 3.111 1.22 4.88 1.22 5.507 0 9.99-4.479 9.99-9.985 0-5.507-4.482-9.991-9.987-9.991zm5.706 14.152c-.237.667-1.378 1.282-1.916 1.344-.51.058-1.164.083-3.666-.948-3.036-1.252-4.97-4.343-5.121-4.544-.151-.202-1.22-1.625-1.22-3.1 0-1.474.773-2.198 1.047-2.496.273-.298.597-.373.796-.373.199 0 .398.003.571.01.185.008.435-.07.68.519.255.614.872 2.128.948 2.282.076.155.126.335.025.536-.1.201-.151.326-.301.502-.151.176-.317.393-.453.528-.151.15-.31.314-.134.615.176.301.782 1.291 1.677 2.089 1.15 1.026 2.121 1.344 2.422 1.495.301.151.478.126.654-.075.176-.201.753-.878.954-1.179.201-.301.402-.251.678-.151.276.1 1.756.828 2.057.979.301.151.502.226.577.352.076.126.076.727-.161 1.394z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    case 'discord':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={color}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      );
    case 'clubhouse':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5zm-5-4.5a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 8 12z"/>
        </svg>
      );
    case 'telegram':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.27-2.04-.49-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.07-.75 4.19-1.82 6.98-3.02 8.37-3.6 3.99-1.66 4.82-1.95 5.36-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.13-.03.22z"/>
        </svg>
      );
    case 'medium':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={color}>
          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={color}>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
        </svg>
      );
    default:
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8M8 12h8"></path>
        </svg>
      );
  }
};

export const ProfileCard = ({ profile, onShowToast, onOpenQr }) => {
  const handleSaveContact = () => {
    downloadVCard(profile);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 }
    });
    if (onShowToast) {
      onShowToast(`Saved ${profile.name}'s contact (.vcf)`);
    }
  };

  const handleSocialClick = (social) => {
    if (social.url) {
      window.open(social.url, '_blank');
      if (onShowToast) onShowToast(`Opened ${social.name}`);
    } else {
      navigator.clipboard.writeText(social.handle);
      if (onShowToast) onShowToast(`Copied ${social.handle} to clipboard!`);
    }
  };

  return (
    <div className="card-wrapper-3d">
      <div className="single-card-container">
        {/* Banner Section */}
        <div className="banner-container">
          <img 
            src={profile.banner} 
            alt="Profile Banner" 
            className="profile-banner" 
          />
          <div className="banner-overlay"></div>
        </div>
        
        {/* Avatar Ring (Without tick mark) */}
        <div className="profile-avatar-wrapper">
          <div className="avatar-ring">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="profile-avatar" 
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h2 className="profile-name">
            {profile.name}
          </h2>
          <p className="profile-role">{profile.role}</p>
          {profile.company && (
            <p className="profile-company">{profile.company}</p>
          )}

          {/* Quick Action Circle Buttons */}
          <div className="quick-actions-row">
            {profile.phone && (
              <a 
                href={`tel:${profile.phone}`} 
                className="quick-action-circle" 
                title="Call Phone"
                onClick={() => onShowToast && onShowToast(`Calling ${profile.phone}...`)}
              >
                <Phone size={19} />
              </a>
            )}
            {profile.email && (
              <a 
                href={`mailto:${profile.email}`} 
                className="quick-action-circle" 
                title="Send Email"
                onClick={() => onShowToast && onShowToast(`Emailing ${profile.email}...`)}
              >
                <Mail size={19} />
              </a>
            )}
            {profile.website && (
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noreferrer"
                className="quick-action-circle" 
                title="Visit Website"
                onClick={() => onShowToast && onShowToast(`Opening ${profile.website}`)}
              >
                <LinkIcon size={19} />
              </a>
            )}
            <button 
              onClick={onOpenQr} 
              className="quick-action-circle" 
              title="Show QR Code"
            >
              <Share2 size={19} />
            </button>
          </div>

          {/* Save Contact CTA */}
          <button 
            onClick={handleSaveContact} 
            className="save-contact-btn"
          >
            <BookmarkPlus size={20} />
            + Save Contact
          </button>
        </div>

        {/* Subtle Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '40px 28px 32px' }}></div>

        {/* Integrated Social Grid */}
        <div 
          className="social-section-wrapper"
          style={{ 
            padding: '12px 24px 0'
          }}
        >
          <div 
            className="social-grid"
            style={{
              gap: profile.socials.length <= 3 ? '10px 14px' : '16px 14px'
            }}
          >
            {profile.socials.map((social) => (
              <div 
                key={social.id} 
                className="social-item" 
                onClick={() => handleSocialClick(social)}
              >
                <div 
                  className="social-icon-box" 
                  style={{ backgroundColor: social.bgColor || 'rgba(255, 255, 255, 0.08)' }}
                >
                  <SocialIcon social={social} type={social.icon} color={social.color} />
                </div>
                <span className="social-label">{social.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
