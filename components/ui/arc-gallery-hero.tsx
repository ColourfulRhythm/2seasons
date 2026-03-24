'use client';

import React, { useEffect, useState } from 'react';

// Default dimensions for SSR (avoids hydration mismatch with window-dependent values)
const DEFAULT_DIMENSIONS = { radius: 480, cardSize: 120 };

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href?: string };
  secondaryCta?: { label: string; href?: string };
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 260,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  className = '',
  title = "Welcome to 2 Seasons",
  subtitle = "Africa's First Regenerative Innovation Village. A once-in-a-generation opportunity to be part of a pioneering eco-friendly lifestyle village.",
  primaryCta = { label: 'Explore Our World', href: '/explore' },
  secondaryCta = { label: 'How It Works', href: '#how-it-works' },
}) => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState(DEFAULT_DIMENSIONS);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  const shellStyle: React.CSSProperties = {
    backgroundColor: '#2d1f14',
    color: '#ffffff',
  };

  // Avoid hydration mismatch: render static placeholder until mounted
  if (!mounted) {
    return (
      <section
        className={`hero-2seasons-shell relative overflow-hidden min-h-screen flex flex-col pt-14 md:pt-16 ${className}`}
        style={shellStyle}
      >
        <div className="relative mx-auto" style={{ width: '100%', height: DEFAULT_DIMENSIONS.radius * 1.2 }} />
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
          <div className="text-center max-w-2xl px-6" style={{ color: '#ffffff' }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: '#ffffff' }}>
              {title}
            </h1>
            <p className="mt-4 text-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`hero-2seasons-shell relative overflow-hidden min-h-screen flex flex-col pt-14 md:pt-16 ${className}`}
      style={shellStyle}
    >
      <div
        className="relative mx-auto"
        style={{
          width: '100%',
          height: dimensions.radius * 1.2,
        }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  zIndex: count - i,
                  opacity: 1,
                }}
              >
                <div
                  className="rounded-2xl shadow-xl overflow-hidden ring-1 ring-white/10 bg-white/5 transition-transform hover:scale-105 w-full h-full"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  <img
                    src={src}
                    alt={`2 Seasons ${i + 1}`}
                    className="block w-full h-full object-cover"
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x400/334155/e2e8f0?text=2+Seasons`;
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div className="text-center max-w-2xl px-6" style={{ color: '#ffffff' }}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: '#ffffff' }}>
            {title}
          </h1>
          <p className="mt-4 text-lg" style={{ color: 'rgba(255,255,255,0.88)' }}>
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={primaryCta.href}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#61300D] text-white hover:bg-[#E68946] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center font-medium"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-all duration-200 text-center"
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};
