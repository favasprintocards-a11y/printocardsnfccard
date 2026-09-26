import React, { useState, useEffect } from 'react';
import { INITIAL_PROFILE } from './data/initialProfile';
import { ProfileCard } from './components/ProfileCard';
import { QrModal } from './components/QrModal';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  useEffect(() => {
    setProfile(INITIAL_PROFILE);
  }, [INITIAL_PROFILE]);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      {/* Dynamic Animated Ambient Mesh Orbs */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>

      {/* Full Page Profile Display */}
      <main style={{
        width: '100%',
        maxWidth: '580px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        margin: '0 auto',
        flex: 1
      }}>
        <ProfileCard
          profile={profile}
          onShowToast={showToast}
          onOpenQr={() => setIsQrOpen(true)}
        />
      </main>


      {/* Modern QR Code Modal */}
      <QrModal
        profile={profile}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={18} color="#00F0FF" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
