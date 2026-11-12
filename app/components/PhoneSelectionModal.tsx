"use client";

import { useEffect, useRef } from 'react';
import type { ContactOption } from './ContactSelectionModal';

type PhoneSelectionModalProps = {
  contacts: ContactOption[];
  onClose: () => void;
};

export default function PhoneSelectionModal({ contacts, onClose }: PhoneSelectionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const numbers = contacts.filter((contact) => contact.phone);

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
        aria-labelledby="phone-selection-title"
        className="flex max-h-[85vh] w-full max-w-md flex-col rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="phone-selection-title" className="text-lg font-black">
              Call
            </h2>
            <p className="mt-1 text-sm text-slate-300">Choose a number to call.</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close phone selection"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300/60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto pr-1">
          {numbers.map((contact) => (
            <div
              key={contact.id}
              className="flex w-full items-start gap-3 rounded-2xl border border-slate-600 bg-slate-700/40 px-4 py-3 text-left"
            >
              {contact.photo ? (
                <img
                  src={contact.photo}
                  alt=""
                  className="mt-0.5 h-10 w-10 shrink-0 rounded-xl object-cover object-top"
                />
              ) : (
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-amber-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold leading-tight">{contact.name}</span>
                <a href={`tel:${contact.phone?.replace(/\s/g, '')}`} className="mt-1 block text-xs text-slate-300 hover:text-white">
                  {contact.phone}
                </a>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="mt-1 block truncate text-xs text-blue-300 hover:underline">
                    {contact.email}
                  </a>
                ) : null}
                {contact.website ? (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate text-xs text-blue-300 hover:underline">
                    {contact.website.replace(/^https?:\/\//, '')}
                  </a>
                ) : null}
                {contact.address ? <span className="mt-1 block text-xs leading-snug text-slate-300">{contact.address}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
