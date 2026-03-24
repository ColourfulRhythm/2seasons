'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const SCROLL_RANGE = 450; // px of scroll to go from 0 to 1

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let lastProgress = -1;

    const handleScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;
        const progress = Math.min(Math.max(y / SCROLL_RANGE, 0), 1);
        if (Math.abs(progress - lastProgress) > 0.005) {
          lastProgress = progress;
          setScrollProgress(progress);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== 'video') return;
    const playVideo = () => {
      video.muted = true;
      video.play().catch(() => {});
    };
    const events = ['touchstart', 'touchend', 'click'] as const;
    events.forEach((ev) =>
      document.addEventListener(ev, playVideo, { once: true, passive: true })
    );
    const t = setTimeout(playVideo, 500);
    return () => {
      clearTimeout(t);
      events.forEach((ev) => document.removeEventListener(ev, playVideo));
    };
  }, [mediaType]);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const mediaScale = isMobileState
    ? 0.35 + scrollProgress * 0.65
    : 1;
  const textTranslateX = scrollProgress * (isMobileState ? 40 : 50);
  const showContent = scrollProgress > 0.3;

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="overflow-x-hidden">
      <section
        className="relative flex flex-col items-center min-h-[100dvh] min-h-[100vh]"
        style={{ backgroundColor: '#2d1f14' }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{
            opacity: 1 - scrollProgress * 0.7,
            backgroundColor: '#2d1f14',
            backgroundImage: `url(${bgImageSrc})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container mx-auto flex flex-col items-center justify-start relative z-10 flex-1">
          <div className="flex flex-col items-center justify-center w-full flex-1 min-h-[85dvh] relative">
            <div
              className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shrink-0 transform-gpu origin-center"
              style={
                isMobileState
                  ? {
                      width: 950,
                      height: 600,
                      maxWidth: '95vw',
                      maxHeight: '80vh',
                      transform: `translate(-50%, -50%) scale(${mediaScale})`,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                    }
                  : {
                      width: `${mediaWidth}px`,
                      height: `${mediaHeight}px`,
                      maxWidth: '95vw',
                      maxHeight: '80vh',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                    }
              }
            >
              {mediaType === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover bg-[#1a1a1a]"
                    controls={false}
                  >
                    <source
                      src={mediaSrc.replace(/\.mov$/i, '.mp4')}
                      type="video/mp4"
                    />
                    <source src={mediaSrc} type="video/quicktime" />
                  </video>
                  <div
                    className="absolute inset-0 bg-black/30 rounded-xl"
                    style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={mediaSrc}
                    alt={title || ''}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                    unoptimized={mediaSrc.startsWith('/')}
                  />
                  <div
                    className="absolute inset-0 bg-black/40"
                    style={{ opacity: 0.7 - scrollProgress * 0.3 }}
                  />
                </div>
              )}

              <div className="flex flex-col items-center text-center relative z-10 mt-4 px-4">
                {date && (
                  <p
                    className="text-lg md:text-xl text-white/90"
                    style={{ transform: `translateX(-${textTranslateX}px)` }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className="text-white/80 text-sm md:text-base mt-1"
                    style={{
                      opacity: 1 - scrollProgress,
                      transform: `translateX(${textTranslateX}px)`,
                    }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`flex items-center justify-center text-center gap-3 md:gap-4 w-full relative z-10 mt-4 px-4 ${
                textBlend ? 'mix-blend-difference' : ''
              }`}
            >
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
                style={{ transform: `translateX(-${textTranslateX}px)` }}
              >
                {firstWord}
              </h2>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-white drop-shadow-lg"
                style={{ transform: `translateX(${textTranslateX}px)` }}
              >
                {restOfTitle}
              </h2>
            </div>
          </div>

          <section
            className="flex flex-col w-full px-6 py-12 md:px-16 md:py-20"
            style={{
              opacity: showContent ? 1 : 0.3,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {children}
          </section>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
