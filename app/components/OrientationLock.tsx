'use client';

import { useEffect } from 'react';

function isPhone() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const hardwareShort = Math.min(window.screen.width, window.screen.height);
  const viewportShort = Math.min(window.innerWidth, window.innerHeight);
  return coarse && (hardwareShort <= 500 || viewportShort <= 500);
}

function landscapeAngle() {
  const reported =
    typeof window.orientation === 'number'
      ? window.orientation
      : (window.screen.orientation?.angle ?? 0);
  const landscape = window.matchMedia('(orientation: landscape)').matches;

  if (!landscape) {
    return null;
  }

  if (reported === -90 || reported === 270) {
    return '-90';
  }

  return '90';
}

export default function OrientationLock() {
  useEffect(() => {
    const root = document.documentElement;

    const lockPortrait = () => {
      const orientation = window.screen.orientation;
      if (!orientation?.lock) {
        return;
      }

      orientation.lock('portrait').catch(() => {
        orientation.lock('portrait-primary').catch(() => undefined);
      });
    };

    const apply = () => {
      document.body.style.width = '';
      document.body.style.height = '';
      delete root.dataset.orientationLock;

      if (!isPhone()) {
        return;
      }

      const angle = landscapeAngle();
      if (!angle) {
        return;
      }

      const viewport = window.visualViewport;
      const viewportWidth = viewport?.width ?? window.innerWidth;
      const viewportHeight = viewport?.height ?? window.innerHeight;
      document.body.style.width = `${Math.round(viewportHeight)}px`;
      document.body.style.height = `${Math.round(viewportWidth)}px`;
      root.dataset.orientationLock = angle;
      lockPortrait();
    };

    apply();
    lockPortrait();
    window.addEventListener('orientationchange', apply);
    window.addEventListener('resize', apply);

    return () => {
      window.removeEventListener('orientationchange', apply);
      window.removeEventListener('resize', apply);
      delete root.dataset.orientationLock;
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  return null;
}
