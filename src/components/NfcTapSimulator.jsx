import React, { useState } from 'react';
import { Wifi, Sparkles, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NfcTapSimulator = ({ profile, onShowToast }) => {
  const [isTapping, setIsTapping] = useState(false);

  // Synthesize haptic tap chime using Web Audio API
  const playTapAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5 note

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Audio fallback silent
    }
  };

  const handleTap = () => {
    if (isTapping) return;
    setIsTapping(true);
    playTapAudio();

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onShowToast) {
        onShowToast(`⚡ NFC Card Tapped! ${profile.name}'s profile unlocked.`);
      }
      setIsTapping(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', left: '32px', top: '100px', zIndex: 40 }}>
      <div style={{
        background: 'rgba(24, 27, 33, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '20px',
        width: '300px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        color: '#FFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wifi size={18} color="#6E3AFF" />
            NFC Tap Simulator
          </h3>
          <span style={{ fontSize: '10px', background: 'rgba(110, 58, 255, 0.2)', color: '#9D4EDD', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
            LIVE TEST
          </span>
        </div>

        {/* Physical Card Visual */}
        <div 
          onClick={handleTap}
          style={{
            height: '150px',
            borderRadius: '16px',
            background: '#181B21',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isTapping ? 'translate(60px, -20px) scale(0.9) rotate(8deg)' : 'translate(0) rotate(0)'
          }}
        >
          {/* Card Chip & Logo */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '24px', background: '#FFD700', borderRadius: '6px' }}></div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.5px' }}>
              tap.
            </span>
          </div>

          <div style={{ position: 'absolute', right: '16px', top: '45%', opacity: 0.25 }}>
            <Wifi size={40} />
          </div>

          {/* Cardholder Name */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {profile.name}
            </div>
            <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
              {profile.role}
            </div>
          </div>
        </div>

        <button 
          onClick={handleTap}
          style={{
            marginTop: '16px',
            width: '100%',
            background: isTapping ? '#6E3AFF' : 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFF',
            padding: '12px',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Smartphone size={16} />
          {isTapping ? 'Tapping NFC...' : 'Tap Physical Card on Phone'}
        </button>
      </div>
    </div>
  );
};
