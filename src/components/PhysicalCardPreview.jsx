import React, { useState } from 'react';
import { X, CreditCard, Sparkles, Check } from 'lucide-react';

export const PhysicalCardPreview = ({ profile, isOpen, onClose, onShowToast }) => {
  const [material, setMaterial] = useState('matte-black');

  if (!isOpen) return null;

  const materials = [
    { id: 'matte-black', name: 'Matte Black Stainless', bg: '#12161F', text: '#FFFFFF' },
    { id: 'titanium', name: 'Brushed Titanium', bg: '#8E9EAB', text: '#111827' },
    { id: 'wood', name: 'Walnut Eco Wood', bg: '#3D2314', text: '#F3E5AB' },
    { id: 'gold-metal', name: '24K Gold Mirror', bg: '#D4AF37', text: '#1A1A1A' }
  ];

  const currentMat = materials.find((m) => m.id === material) || materials[0];

  const handleOrderCard = () => {
    if (onShowToast) {
      onShowToast(`🛍️ Order request for ${currentMat.name} NFC Card sent!`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <CreditCard size={24} color="#6E3AFF" />
          <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#FFF' }}>
            Physical NFC Card Studio
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px' }}>
          Custom laser engraved hardware card powered by tap. smart chip
        </p>

        {/* 3D Physical Card Render */}
        <div style={{
          width: '100%',
          height: '240px',
          borderRadius: '20px',
          background: currentMat.bg,
          color: currentMat.text,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
          transition: 'all 0.4s ease',
          overflow: 'hidden'
        }}>
          {/* NFC Chip visual */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '30px',
              borderRadius: '6px',
              background: '#D4AF37',
              border: '1px solid rgba(0,0,0,0.3)'
            }}></div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', letterSpacing: '-0.8px' }}>
              tap.
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {profile.name}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.85, fontWeight: 600 }}>
              {profile.role} • {profile.company}
            </div>
          </div>
        </div>

        {/* Material Selection Pills */}
        <div style={{ marginTop: '24px', width: '100%' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', display: 'block', textAlign: 'left', marginBottom: '8px' }}>
            Card Material Finish
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => setMaterial(m.id)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: material === m.id ? '2px solid #6E3AFF' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: material === m.id ? 'rgba(110, 58, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {m.name}
                {material === m.id && <Check size={14} color="#6E3AFF" />}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleOrderCard}
          style={{
            marginTop: '24px',
            width: '100%',
            background: 'var(--primary-purple)',
            border: 'none',
            color: '#FFF',
            padding: '14px',
            borderRadius: '18px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px var(--primary-purple-glow)'
          }}
        >
          <Sparkles size={18} />
          Order Custom NFC Physical Card
        </button>
      </div>
    </div>
  );
};
