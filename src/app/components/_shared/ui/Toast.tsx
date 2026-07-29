'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ToastTone = 'success' | 'error';

interface ToastProps {
  message: string;
  tone?: ToastTone;
  onClose: () => void;
  /** Durée d'affichage en ms. */
  duration?: number;
}

const TONES: Record<ToastTone, string> = {
  success: 'border-green-500/40 bg-green-950/95 text-green-100',
  error: 'border-red-500/40 bg-red-950/95 text-red-100',
};

/**
 * Notification temporaire affichée en bas à droite de l'écran.
 * Rendue via un portail sur <body> : un parent avec transform ou filter
 * casserait sinon le positionnement fixed.
 */
export default function Toast({ message, tone = 'success', onClose, duration = 4000 }: ToastProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const showId = requestAnimationFrame(() => setIsVisible(true));
    const hideId = setTimeout(onClose, duration);
    return () => {
      cancelAnimationFrame(showId);
      clearTimeout(hideId);
    };
  }, [onClose, duration]);

  if (!isMounted) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={`font-[roboto] fixed bottom-6 right-6 z-[100] flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-300 ${
        TONES[tone]
      } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <span aria-hidden="true" className="mt-px font-semibold">
        {tone === 'success' ? '✓' : '!'}
      </span>
      <p className="flex-1">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la notification"
        className="shrink-0 text-white/60 transition-colors hover:text-white"
      >
        ✕
      </button>
    </div>,
    document.body
  );
}
