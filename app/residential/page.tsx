import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  TreePine,
  Activity,
  ShoppingBag,
  Baby,
  Shield,
  Zap,
  Droplets,
  Wifi,
  Recycle,
  Car,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: "2 Seasons Residential - Sustainable Living | Kobape, Abeokuta",
  description: "Discover modern sustainable living at 2 Seasons Residential. Eco-friendly homes, landscaped streets, and active lifestyle amenities in Kobape, Abeokuta, Ogun State, Nigeria.",
};

export default function ResidentialPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(97, 48, 13, 0.85), rgba(230, 137, 70, 0.7)), url('/assets/images/modern-homes.jpg')",
        }}
      >
        <div className="text-center px-6 pt-24 pb-16">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs tracking-wider rounded-full mb-4">Sustainable Living</span>
          <h1 className="text-4xl md:text-6xl text-white font-serif">
            Residential <em className="italic text-[#E68946]">Living</em>
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
            A serene gated community where modern design meets sustainable living in the heart of Kobape, Abeokuta
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl text-[#2d1f14] font-serif mb-6">
            Modern Homes for <em className="italic text-[#c9a96e]">Contemporary Living</em>
          </h2>
          <p className="text-[#4a4a4a] text-lg leading-relaxed">
            2 Seasons Residential offers a unique blend of modern architecture and eco-friendly design. Our community features contemporary apartments, cottages, and duplexes designed for comfort and sustainability, perfect for families and young professionals seeking a balanced lifestyle in Nigeria.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Home, title: "Modern Homes", desc: "Contemporary apartments, cottages, and duplexes designed with sustainable materials and energy-efficient features." },
            { icon: TreePine, title: "Landscaped Streets", desc: "Beautifully designed pathways with lush greenery, creating a serene environment for daily living." },
            { icon: Activity, title: "Active Lifestyle", desc: "Dedicated lanes for driving, cycling, and jogging, promoting health and wellness for all residents." },
            { icon: ShoppingBag, title: "Shopping Mall", desc: "Convenient retail spaces within the community for your daily needs and lifestyle requirements." },
            { icon: Baby, title: "Playgrounds", desc: "Safe and modern play areas designed for children to explore, learn, and have fun." },
            { icon: Shield, title: "24/7 Security", desc: "Comprehensive security system with trained personnel ensuring your family's safety around the clock." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-[#fafaf8] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#2d1f14]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#61300D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2d1f14] mb-2">{title}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl text-[#2d1f14] font-serif mb-4">
            Essential <em className="italic text-[#c9a96e]">Amenities</em>
          </h2>
          <p className="text-[#4a4a4a]">Everything you need for comfortable living, thoughtfully integrated into our community</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, label: "24/7 Power Supply" },
            { icon: Droplets, label: "Clean Water System" },
            { icon: Wifi, label: "High-Speed Internet" },
            { icon: Recycle, label: "Waste Management" },
            { icon: Car, label: "Ample Parking" },
            { icon: Lightbulb, label: "Street Lighting" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm">
              <Icon className="w-5 h-5 text-[#61300D] shrink-0" />
              <span className="text-[#2d1f14] font-medium text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#2d1f14]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white font-serif mb-4">Make 2 Seasons Your Home</h2>
          <p className="text-white/80 mb-8">Experience sustainable living at its finest. Secure your plot in our residential community today.</p>
          <Link
            href="/join"
            className="inline-block px-8 py-4 bg-[#61300D] text-white font-semibold rounded-full hover:bg-[#E68946] transition-colors"
          >
            Book Your Preview
          </Link>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="py-8 px-6 border-t border-[#2d1f14]/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6a6a6a] text-sm">© 2025 2 Seasons. Africa&apos;s First Regenerative Innovation & Lifestyle Village.</p>
          <Link href="/" className="text-[#61300D] hover:text-[#E68946] text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
