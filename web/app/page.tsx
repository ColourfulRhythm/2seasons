'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/100plots/droneview.mov"
        posterSrc="/100plots/drone-image.jpg"
        bgImageSrc="/100plots/drone-image.jpg"
        title="Welcome to 2 Seasons"
        date="Kobape, Abeokuta"
        scrollToExpand="Scroll to expand"
        textBlend
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#61300D]">
            So few, so unique
          </h2>
          <p className="text-lg mb-8 text-[#61300D]">
            Africa&apos;s First Regenerative Innovation Village. 2 Seasons represents
            a once-in-a-generation opportunity to be part of Africa&apos;s pioneering
            eco-friendly lifestyle village in Kobape, Abeokuta, Ogun State.
          </p>
          <p className="text-lg mb-8 text-[#61300D]">
            This exclusive development combines sustainable living with world-class
            amenities, creating a new standard for regenerative communities in Nigeria.
          </p>
          <a
            href="/explore"
            className="inline-block px-8 py-4 bg-[#61300D] text-white font-semibold rounded-full hover:bg-[#E68946] transition-colors"
          >
            Explore Our World
          </a>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
