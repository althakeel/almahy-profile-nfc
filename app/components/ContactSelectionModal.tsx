"use client";

import { useEffect, useRef } from 'react';

function isMobilePhone() {
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export type ContactOption = {
  id: string;
  name: string;
  file: string | null;
  enabled: boolean;
  photo?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
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
        className="contact-selection-panel flex max-h-[85vh] w-full max-w-md flex-col rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-2xl"
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

        <div className="space-y-3 overflow-y-auto pr-1">
          {contacts.map((contact) => {
            const available = contact.enabled && contact.file !== null;
            const filename = contact.file?.split('/').pop() || 'contact.vcf';
            const mobile = available && isMobilePhone();
            const rowClass =
              'flex w-full items-start gap-3 rounded-2xl border border-slate-600 bg-slate-700/40 px-4 py-3 text-left';
            const row = (
              <>
                {contact.photo ? (
                  <img
                    src={contact.photo}
                    alt=""
                    className="mt-0.5 h-10 w-10 shrink-0 rounded-xl object-cover object-top"
                  />
                ) : (
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-amber-300">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                    </svg>
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold leading-tight">{contact.name}</span>
                  {contact.phone ? <span className="mt-1 block text-xs text-slate-300">{contact.phone}</span> : null}
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
              </>
            );
            const saveControl = available ? (
              <a
                href={`/download/contact-${contact.id}.vcf`}
                download={mobile ? undefined : filename}
                onClick={() => onSelect(contact)}
                aria-label={`Save ${contact.name} contact`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
              >
                Save contact
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="m7 10 5 5 5-5M12 15V3" />
                </svg>
              </a>
            ) : (
              <span className="shrink-0 rounded-full bg-slate-600/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Coming Soon
              </span>
            );

            return (
              <div key={contact.id} className={rowClass}>
                {row}
                {saveControl}
              </div>
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
