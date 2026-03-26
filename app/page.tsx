'use client';

import { useEffect } from 'react';
import { ArcGalleryHero } from '@/components/ui/arc-gallery-hero';
import {
  ArrowRight,
  Mountain,
  Droplets,
  Palette,
  GraduationCap,
  Train,
  Car,
} from 'lucide-react';
import Image from 'next/image';

const heroImages = [
  '/wellnesshub/scene7.jpg',
  '/100plots/drone-image.jpg',
  '/100plots/bf-2.jpg',
  '/100plots/bf-3.jpg',
  '/100plots/butterfly-1.jpg',
  '/100plots/site-plans.jpg',
  '/100plots/plot-cornerpiece.jpg',
  '/assets/images/luxury-villas.jpg',
  '/assets/images/artificial-lake.jpg',
  '/assets/images/natural-therapy-and-spa.jpg',
  '/assets/images/waterfall-retreats.jpg',
  '/assets/images/lake-view-pods.jpg',
];

const landmarks = [
  {
    icon: Mountain,
    title: 'Olumo Rock',
    description:
      "Historic landmark and natural fortress offering panoramic views of Abeokuta. A must-visit tourist attraction rich in Egba history and cultural heritage.",
  },
  {
    icon: Droplets,
    title: 'Ogun River',
    description:
      "The sacred river that gives Ogun State its name. A vital waterway flowing through Abeokuta, providing scenic beauty and natural resources to the region.",
  },
  {
    icon: Palette,
    title: 'Abeokuta Polo Club',
    description:
      "Prestigious sports and social club offering polo, equestrian activities, and elite networking. A symbol of luxury lifestyle in Abeokuta.",
  },
  {
    icon: GraduationCap,
    title: 'Daywaterman College',
    description:
      "Renowned educational institution known for academic excellence and character development. Quality education access for 2 Seasons residents.",
  },
  {
    icon: Train,
    title: 'Wole Soyinka Train Station',
    description:
      "Modern railway station named after Nobel laureate Wole Soyinka. Convenient rail connectivity to Lagos and major Nigerian cities.",
  },
  {
    icon: Car,
    title: 'Abeokuta Interchange',
    description:
      "Major transportation hub connecting Abeokuta to Lagos and Ogun State. Strategic access point for seamless travel.",
  },
];

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ArcGalleryHero
        images={heroImages}
        title="Welcome to 2 Seasons"
        subtitle="Africa's First Regenerative Innovation Village. A once-in-a-generation opportunity to be part of a pioneering eco-friendly lifestyle village in Kobape, Abeokuta."
        primaryCta={{ label: 'Explore Our World', href: '/explore' }}
        secondaryCta={{ label: 'How It Works', href: '#phases' }}
      />

      {/* Phases Section - Agro Tucks & Residential */}
      <section id="phases" className="bg-[#0d0d0d] py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[#a0855a] text-xs tracking-[0.25em] uppercase mb-3">The 2 Seasons Story</p>
          <h2 className="text-2xl md:text-4xl text-[#f5f0e8] font-serif">
            Two phases. <em className="italic text-[#c9a96e]">One vision.</em>
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-px">
          <div className="bg-[#161616] border border-[#2a2a2a] p-8 md:p-12 flex flex-col">
            <span className="text-[#666] text-[10px] tracking-[0.3em] uppercase mb-4">Phase 1</span>
            <h3 className="text-xl md:text-2xl text-[#f5f0e8] font-serif mb-2">Tucks</h3>
            <p className="text-[#c9a96e] text-sm tracking-wide mb-6 font-medium">500 sqm from ₦1,500,000 · 1 acre ₦6,500,000</p>
            <p className="text-[#9a9a9a] text-sm leading-relaxed mb-4">
              Own land you can actually live on and grow from. Agro Tucks are farmstead-style plots where you build your home and cultivate your own food — a quiet, rooted lifestyle on the edge of Nigeria&apos;s most exciting new community.
            </p>
            <p className="text-[#6a6a6a] text-sm italic mb-4">Basic infrastructure included: internal roads, street lighting, and drainage.</p>
            <p className="text-[#7a7a7a] text-sm font-serif italic mb-8 flex-grow">This is where the 2 Seasons story begins.</p>
            <a
              href="/50plots"
              className="inline-flex items-center gap-2 text-[#f5f0e8] text-xs tracking-[0.12em] uppercase border-b border-[#444] pb-1 w-fit hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
            >
              Secure Your Agro Tuck <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="bg-[#1a1510] border border-[#3a2e1e] p-8 md:p-12 flex flex-col">
            <span className="text-[#a0855a] text-[10px] tracking-[0.3em] uppercase mb-4">Phase 2</span>
            <h3 className="text-xl md:text-2xl text-[#f5f0e8] font-serif mb-2">The Lifestyle City</h3>
            <p className="text-[#c9a96e] text-sm tracking-wide mb-6 font-medium">From ₦1.5M (₦10,000/sqm)</p>
            <p className="text-[#9a9a9a] text-sm leading-relaxed mb-4">
              This is the full vision. Residential living inside Africa&apos;s first regenerative lifestyle city — with a private racing circuit, wellness village, concert ground, co-working spaces, and a community built for Nigeria&apos;s next generation.
            </p>
            <p className="text-[#7a7a7a] text-sm font-serif italic mb-8 flex-grow">If Phase 1 is the roots, Phase 2 is everything that grows from them.</p>
            <a
              href="/residential"
              className="inline-flex items-center gap-2 text-[#c9a96e] text-xs tracking-[0.12em] uppercase border-b border-[#c9a96e]/30 pb-1 w-fit hover:border-[#c9a96e] transition-colors"
            >
              Explore Phase 2 <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* So few, so unique */}
      <section className="bg-[#2d1f14] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-[#61300D] text-white text-xs tracking-wider rounded-full mb-6">Limited Opportunity</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-serif">
            So few,<br />so unique
          </h2>
          <p className="text-[#E68946] text-lg mb-6">Africa&apos;s First Regenerative Innovation Village</p>
          <p className="text-lg mb-8 text-white/90">
            Africa&apos;s First Regenerative Innovation Village. 2 Seasons represents
            a once-in-a-generation opportunity to be part of Africa&apos;s pioneering
            eco-friendly lifestyle village in Kobape, Abeokuta, Ogun State.
          </p>
          <p className="text-lg mb-8 text-white/90">
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
      </section>

      {/* Residential Section */}
      <section id="residential" className="bg-[#fafaf8] py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/modern-homes.jpg"
              alt="2 Seasons Residential - Modern Sustainable Living"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl text-[#2d1f14] font-serif mb-6">
              Residential <em className="italic text-[#c9a96e]">Living</em>
            </h2>
            <p className="text-[#4a4a4a] text-lg leading-relaxed mb-8">
              A serene gated community designed for modern families and young professionals seeking sustainable living in Nigeria. Experience contemporary homes with landscaped streets, active lifestyle amenities, and essential retail spaces—all within an eco-friendly environment in Kobape, Abeokuta.
            </p>
            <a
              href="/residential"
              className="inline-flex items-center gap-2 text-[#2d1f14] font-medium border-b-2 border-[#2d1f14] pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
            >
              Explore Residential <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Wellness Section */}
      <section id="wellness" className="bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl text-[#2d1f14] font-serif mb-6">
              Wellness <em className="italic text-[#c9a96e]">Hub</em>
            </h2>
            <p className="text-[#4a4a4a] text-lg leading-relaxed mb-8">
              A holistic wellness center dedicated to fitness, healing, and mental well-being. Featuring spa services, yoga pavilions, outdoor fitness areas, world-class sports facilities, and plant-based dining. Our wellness hub also includes a dynamic youth sports academy training 100 youths annually in football, tennis, and athletics.
            </p>
            <a
              href="/wellness"
              className="inline-flex items-center gap-2 text-[#2d1f14] font-medium border-b-2 border-[#2d1f14] pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
            >
              Visit Wellness Hub <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl order-1 md:order-2">
            <Image
              src="/assets/images/natural-therapy-and-spa.jpg"
              alt="Wellness Hub - Holistic Health & Fitness"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-[#f8f5f0] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-[#2d1f14] font-serif mb-4">
            Abeokuta <em className="italic text-[#c9a96e]">at its best</em>
          </h2>
          <p className="text-[#4a4a4a] text-lg">
            In a prime location in Kobape, Abeokuta&apos;s emerging neighborhood, well connected and close to a wealth of attractions in Ogun State, Nigeria.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {landmarks.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-[#2d1f14]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#61300D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">{title}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Quote */}
      <section className="bg-[#2d1f14] py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-6xl text-[#c9a96e]/30 font-serif leading-none">&ldquo;</span>
          <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed -mt-4 mb-6">
            We are creating more than a development—we are building a regenerative ecosystem where innovation,
            wellness, and sustainable living converge. 2 Seasons is designed to inspire and nurture the next
            generation of African leaders, creators, and changemakers.
          </blockquote>
          <p className="text-[#c9a96e] font-serif">— The 2 Seasons Vision</p>
          <p className="text-white/60 text-sm mt-2">On creating Africa&apos;s first regenerative innovation and lifestyle village in Kobape, Abeokuta, Ogun State.</p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="bg-[#0d0d0d] py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-serif mb-4">Book Your Private Preview</h2>
          <p className="text-white/80 mb-8">Experience the future of sustainable living in Nigeria</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="/join"
              className="w-full sm:w-auto px-8 py-4 bg-[#61300D] text-white font-semibold rounded-full hover:bg-[#E68946] transition-colors text-center"
            >
              Schedule Your Visit
            </a>
            <a
              href="https://www.subxhq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Own Now in 1 Hour
            </a>
          </div>
          <p className="text-white/60 text-sm">Contact Our Concierge</p>
          <a href="mailto:2seasonsabk@2seasonsabk.store" className="text-[#c9a96e] hover:underline">
            2seasonsabk@2seasonsabk.store
          </a>
        </div>
      </section>
    </div>
  );
}
