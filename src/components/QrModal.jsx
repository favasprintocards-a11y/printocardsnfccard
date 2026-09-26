import React, { useEffect, useRef } from 'react';
import { X, Download, Share2, Copy } from 'lucide-react';
import QRCode from 'qrcode';

export const QrModal = ({ profile, isOpen, onClose, onShowToast }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const shareUrl = window.location.href;
      QRCode.toCanvas(
        canvasRef.current,
        shareUrl,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#111827',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleDownloadQr = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_qrcode.png`;
    link.href = url;
    link.click();
    if (onShowToast) onShowToast('QR Code image downloaded!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    if (onShowToast) onShowToast('Profile link copied to clipboard!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#ffffffff',
          color: '#000000ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <Share2 size={24} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#FFF' }}>
          Scan to Connect
        </h3>
        <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '4px', marginBottom: '20px' }}>
          Point camera at QR code to open {profile.name}'s digital card
        </p>

        {/* Canvas for QR code */}
        <div style={{
          background: '#FFF',
          padding: '16px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}>
          <canvas ref={canvasRef}></canvas>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', width: '100%' }}>
          <button
            onClick={handleCopyLink}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFF',
              padding: '12px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Copy size={16} />
            Copy Link
          </button>

          <button
            onClick={handleDownloadQr}
            style={{
              flex: 1,
              background: '#ffffff',
              border: 'none',
              color: '#000000ff',
              padding: '12px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Download size={16} />
            Save PNG
          </button>
        </div>
      </div>
    </div>
  );
};
