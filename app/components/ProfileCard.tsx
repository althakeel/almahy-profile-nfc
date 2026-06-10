"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ProfileCard() {
  const [shareOpen, setShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const contactShareText =
    'Hello, my name is Almahy Mohammed Abdelghany from AlMahy Legal Services. Email: info@almahy.com. Phone: +971 56 766 7466. Visit https://www.almahy.com';
  const profileUrl = 'https://www.almahy.com';
  const encodedContactShare = encodeURIComponent(contactShareText);
  const encodedProfileUrl = encodeURIComponent(profileUrl);

  const shareContact = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Almahy Mohammed Abdelghany',
          text: contactShareText,
          url: profileUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(contactShareText);
      } catch (error) {
        void error;
      }
    }

    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const saveContact = () => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const link = document.createElement('a');

    link.href = '/Almathy.vcf';
    link.rel = 'noopener noreferrer';
    if (isIOS) {
      link.target = '_blank';
    } else {
      link.download = 'Almathy.vcf';
    }
    document.body.appendChild(link);
    link.click();
    link.remove();
    setShareOpen(false);
  };

  useEffect(() => {
    if (!shareOpen) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShareOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [shareOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-4 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 relative z-10">
        {/* Header Background */}
        <div className="h-56 relative overflow-visible bg-slate-950">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/bg/almahy_01.png"
              alt=""
              width={726}
              height={402}
              priority
              sizes="448px"
              className="absolute left-0 top-[46%] w-full max-w-none -translate-y-1/2 scale-[1.08]"
              style={{ filter: "blur(2px)" }}
            />
          </div>
          <div
            className="absolute inset-x-0 top-0 h-[125%] bg-white/10"
            style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
          ></div>
          <div className="absolute inset-x-0 top-0 h-[125%] bg-gradient-to-b from-slate-950/25 via-slate-950/35 to-slate-900/65"></div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  saveContact();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950/80 text-white shadow-lg ring-1 ring-white/10 hover:bg-slate-900 transition"
                aria-label="Save contact"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                  <path d="M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
              </button>

            </div>

            <div ref={shareMenuRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setShareOpen((open) => !open);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950/80 text-white shadow-lg ring-1 ring-white/10 hover:bg-slate-900 transition"
                aria-label="Share contact"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51L15.42 17.49" />
                  <path d="M15.41 6.51L8.59 10.49" />
                </svg>
              </button>

              {shareOpen ? (
                <div className="absolute right-0 top-16 w-48 rounded-3xl bg-slate-900/98 border border-slate-600 p-4 shadow-2xl backdrop-blur-xl z-50">
                  <p className="text-xs uppercase text-slate-400 tracking-widest mb-3 font-semibold">Share on</p>
                  <a
                    href={`https://wa.me/971567667466?text=${encodedContactShare}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300 hover:bg-emerald-500/25 transition font-medium"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white text-xs font-bold">W</span>
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={shareContact}
                    className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-pink-500/15 px-4 py-3 text-left text-sm text-pink-300 hover:bg-pink-500/25 transition font-medium"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500 text-white text-xs font-bold">I</span>
                    Instagram
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedProfileUrl}&quote=${encodedContactShare}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center gap-3 rounded-2xl bg-blue-600/15 px-4 py-3 text-sm text-blue-300 hover:bg-blue-600/25 transition font-medium"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">F</span>
                    Facebook
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* Profile Image - Positioned overlapping header */}
          <div className="absolute bottom-[5px] left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="h-56 w-52 rounded-none bg-transparent overflow-visible">
              <img
                src="/images/almahy/Almahy1.png"
                alt="Almahy Mohammed Abdelghany"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-28 px-6 pb-8">
          {/* Name and Title */}
          <h1 className="text-center text-3xl font-black text-white tracking-tight">
            Almahy Mohammed Abdelghany
          </h1>
          <p className="text-center text-sm font-bold text-amber-400 mt-2 uppercase tracking-widest">
            Almahy For Legal services
          </p>

          {/* About Section */}
          <div className="mt-6 bg-slate-700 bg-opacity-50 p-4 rounded-xl border border-slate-600">
            <h2 className="font-black text-white mb-2 text-xs uppercase tracking-widest">About me</h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              AlMahy Legal Services is a leading UAE-based law firm with over 15 years of experience and a global network of 5,000+ qualified lawyers.
              We provide trusted legal solutions for individuals and businesses, combining local expertise with international legal knowledge.
              Our commitment to excellence ensures professional guidance and reliable support for all your legal needs.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-6">
            <h2 className="font-black text-white text-xs uppercase tracking-widest mb-3">Contact Info</h2>

            <div className="grid grid-cols-3 gap-3">
              <a
                href="tel:+971567667466"
                aria-label="Call +971 56 766 7466"
                className="group flex items-center justify-center w-full h-14 bg-slate-700 bg-opacity-40 rounded-xl border border-slate-600 hover:bg-opacity-60 transition"
              >
                <svg className="w-6 h-6 text-amber-300 transition group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a
                href="mailto:info@almahy.com"
                aria-label="Email info@almahy.com"
                className="group flex items-center justify-center w-full h-14 bg-slate-700 bg-opacity-40 rounded-xl border border-slate-600 hover:bg-opacity-60 transition"
              >
                <svg className="w-6 h-6 text-blue-300 transition group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <div
                aria-label="Office location"
                title="Al-Saqr Business Tower, Sharjah, zayed Road"
                className="group flex items-center justify-center w-full h-14 bg-slate-700 bg-opacity-40 rounded-xl border border-slate-600 hover:bg-opacity-60 transition"
              >
                <svg className="w-6 h-6 text-purple-300 transition group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Website Logos */}
          <div className="mt-6">
            <h2 className="font-black text-white text-xs uppercase tracking-widest mb-4">Our Websites</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { href: "https://efateh.com/", src: "/images/1.png", alt: "Casa Online Logo" },
                { href: "https://www.althakeel.com", src: "/images/2.png", alt: "MediateSuit Logo" },
                { href: "https://www.mindcraft.com", src: "/images/3.png", alt: "HMICuits Logo" },
                { href: "https://www.almahy.com", src: "/images/4.png", alt: "Alfhaidsol Logo" },
                { href: "https://www.luxurywatchdeals.com", src: "/images/5.png", alt: "Luxury Writoth Device Logo" },
                { href: "https://www.casabait.com", src: "/images/6.png", alt: "Almahy  Logo" },
              ].map((site) => (
                <a
                  key={site.src}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-slate-700 bg-opacity-40 p-3 rounded-2xl border border-slate-600 hover:bg-opacity-60 transition flex items-center justify-center h-20"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image src={site.src} alt={site.alt} fill className="object-contain" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-8">
            <h2 className="font-black text-white text-xs uppercase tracking-widest mb-4">My Social Network</h2>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://api.whatsapp.com/send?phone=971567667466" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300/60">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-full"></div>
                <svg className="relative h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.6 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1C346.2 476 448 376.4 448 254c0-59.3-25.2-115-67.1-156.9zM223.9 438.7c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/almahyforlegalservices/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-300/60">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-full"></div>
                <svg className="relative h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S3.3 127.6 1.5 163.5c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/Almahy  Legal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300/60">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-full"></div>
                <svg className="relative h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 320 512" aria-hidden="true">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0C152.14 0 104.23 44.38 104.23 124.72v70.62H22.89V288h81.34v224h100.22V288z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@almahyforlegalservices" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-200/40">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-full"></div>
                <svg className="relative h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M448 209.9v125.1c-21.3 0-42.4-4.2-62.1-12.4v88.4c0 77.3-62.7 140-140 140s-140-62.7-140-140 62.7-140 140-140c7 0 13.9.5 20.6 1.5v68.9c-6.6-2.1-13.5-3.1-20.6-3.1-40.1 0-72.7 32.6-72.7 72.7s32.6 72.7 72.7 72.7 72.7-32.6 72.7-72.7V0h67.3c0 57.8 46.9 104.7 104.7 104.7v67.3c-24.4 0-47.5-5.5-68.1-15.4 15.4 31.8 48 53.3 85.5 53.3z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/watch?v=fkJy3OfT0V8&time_continue=4&source_ve_path=MjE0Mjgz&embeds_referring_euri=https%3A%2F%2Fwww.ecdc.me%2F" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-300/60">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-full"></div>
                <svg className="relative h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 576 512" aria-hidden="true">
                  <path d="M549.7 124.1c-6.3-23.7-24.9-42.3-48.6-48.6C458.3 64 288 64 288 64S117.7 64 74.9 75.5c-23.7 6.3-42.3 24.9-48.6 48.6C14.8 166.9 14.8 256 14.8 256s0 89.1 11.5 131.9c6.3 23.7 24.9 42.3 48.6 48.6C117.7 448 288 448 288 448s170.3 0 213.1-11.5c23.7-6.3 42.3-24.9 48.6-48.6 11.5-42.8 11.5-131.9 11.5-131.9s0-89.1-11.5-131.9zM232 337.6V174.4L376 256 232 337.6z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/almahy-legal-services/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300/60">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-full"></div>
                <svg className="relative h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8 0 24.1 24.1 0 53.79 0s53.79 24.1 53.79 53.8c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Media Section */}
          <div className="mt-8">
            <h2 className="font-black text-white text-xs uppercase tracking-widest mb-3">Media</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-600 bg-slate-900/80 px-4 py-3 shadow-lg shadow-slate-950/20">
                <h3 className="min-w-0 flex-1 text-sm font-black leading-tight text-white">Almahy   Legal Service Brochure</h3>
                <a
                  href="/images/media/Almahy  _Legal_Profile_V16.pdf"
                  download="Almahy  _Legal_Service_Brochure.pdf"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-400 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
                  aria-label="Download Almahy   Legal Service Brochure"
                >
                  Download
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Video Section */}
          <div className="mt-8">
            <h2 className="font-black text-white text-xs uppercase tracking-widest mb-3">Video</h2>
            <div
              className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-600 bg-slate-950 bg-cover bg-center shadow-lg shadow-slate-950/25"
              style={{ backgroundImage: "url(https://img.youtube.com/vi/fkJy3OfT0V8/hqdefault.jpg)" }}
            >
              <iframe
                className="relative h-full w-full"
                src="https://www.youtube.com/embed/fkJy3OfT0V8?start=4&rel=0&modestbranding=1"
                title="Almahy Legal Services video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
