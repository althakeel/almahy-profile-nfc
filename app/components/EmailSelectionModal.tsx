"use client";

import { useEffect, useRef } from 'react';

const emails = [
  { id: 'almahy', label: 'Almahy', address: 'info@almahy.com' },
  { id: 'althakeel', label: 'Althakeel', address: 'management@althakeel.com' },
];

type EmailSelectionModalProps = {
  onClose: () => void;
};

export default function EmailSelectionModal({ onClose }: EmailSelectionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-selection-title"
        className="w-full max-w-md rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="email-selection-title" className="text-lg font-black">
              Email
            </h2>
            <p className="mt-1 text-sm text-slate-300">Choose an address to write to.</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close email selection"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300/60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {emails.map((email) => (
            <a
              key={email.id}
              href={`mailto:${email.address}`}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-600 bg-slate-700/40 px-4 py-3 text-left transition hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-blue-300">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{email.label}</span>
                <span className="block truncate text-xs text-slate-300">{email.address}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
