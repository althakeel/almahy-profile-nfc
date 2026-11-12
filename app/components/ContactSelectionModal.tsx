"use client";

import { useEffect, useRef } from 'react';

export type ContactOption = {
  id: string;
  name: string;
  file: string | null;
  enabled: boolean;
  photo?: string;
  phone?: string;
};

type ContactSelectionModalProps = {
  contacts: ContactOption[];
  onSelect: (contact: ContactOption) => void;
  onClose: () => void;
};

export default function ContactSelectionModal({
  contacts,
  onSelect,
  onClose,
}: ContactSelectionModalProps) {
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
        aria-labelledby="contact-selection-title"
        aria-describedby="contact-selection-description"
        className="contact-selection-panel w-full max-w-md rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="contact-selection-title" className="text-lg font-black">
              Select a Contact
            </h2>
            <p id="contact-selection-description" className="mt-1 text-sm text-slate-300">
              Choose the contact you want to save.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close contact selection"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300/60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {contacts.map((contact) => {
            const available = contact.enabled && contact.file !== null;

            return (
              <button
                key={contact.id}
                type="button"
                disabled={!available}
                onClick={() => onSelect(contact)}
                aria-label={available ? `Save ${contact.name} contact` : undefined}
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-600 bg-slate-700/40 px-4 py-3 text-left transition hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-amber-300/60 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-slate-700/40"
              >
                {contact.photo ? (
                  <img
                    src={contact.photo}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-xl object-cover object-top"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-amber-300">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                    </svg>
                  </span>
                )}
                <span className="min-w-0 flex-1 text-sm font-bold">{contact.name}</span>
                {available ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
                    Save contact
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="m7 10 5 5 5-5M12 15V3" />
                    </svg>
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-slate-600/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <style jsx>{`
        @keyframes contact-selection-enter {
          from {
            opacity: 0;
            transform: translateY(0.5rem) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .contact-selection-panel {
          animation: contact-selection-enter 180ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-selection-panel {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
