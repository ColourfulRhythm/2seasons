'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#residential', label: 'Residential' },
  { href: '/#wellness', label: 'Wellness' },
  { href: '/50plots', label: '50 Plots' },
  { href: '/paymentplan', label: 'Payment Plan' },
  { href: '/partners', label: 'Partners' },
  { href: '/2saffiliate', label: 'Affiliates' },
  { href: '/current-visitors', label: 'Current Visitors' },
  { href: '/join', label: 'Book Preview', cta: true },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#2d1f14]/90 backdrop-blur-md">
        <nav className="flex items-center justify-between px-6 py-3 md:px-8 md:py-2.5">
          <Link
            href="/"
            className="text-base md:text-lg font-semibold text-white tracking-wide z-50"
            onClick={closeMenu}
          >
            2 Seasons
          </Link>

          {/* Desktop nav - compact */}
          <ul className="hidden md:flex items-center gap-4 list-none">
            {navLinks.map(({ href, label, cta }) => (
              <li key={href}>
                {href.startsWith('/#') ? (
                  <a
                    href={href}
                    className={`text-xs tracking-[0.08em] uppercase transition-colors hover:text-[#c9a96e] ${
                      cta
                        ? 'text-[#c9a96e] border border-[#c9a96e]/60 px-3 py-1.5 rounded text-[11px] hover:bg-[#c9a96e]/10'
                        : 'text-white/95'
                    }`}
                  >
                    {label}
                  </a>
                ) : (
                  <a
                    href={href}
                    className={`text-xs tracking-[0.08em] uppercase transition-colors hover:text-[#c9a96e] ${
                      cta
                        ? 'text-[#c9a96e] border border-[#c9a96e]/60 px-3 py-1.5 rounded text-[11px] hover:bg-[#c9a96e]/10'
                        : 'text-white/95'
                    }`}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Hamburger - visible on mobile */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center gap-2 text-white p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <Menu className="w-6 h-6" />
                <span className="text-sm tracking-wide">Menu</span>
              </>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      {/* Mobile slide-out menu - compact */}
      <aside
        className={`fixed top-0 right-0 h-auto max-h-[70vh] w-[min(70vw,280px)] bg-[#2d1f14] rounded-bl-2xl shadow-xl z-40 md:hidden transform transition-transform duration-300 ease-out overflow-y-auto ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col pt-16 pb-6 px-5 gap-0 list-none">
          {navLinks.map(({ href, label, cta }) => (
            <li key={href}>
              {href.startsWith('/#') ? (
                <a
                  href={href}
                  onClick={closeMenu}
                  className={`block py-2.5 text-sm border-b border-white/5 transition-colors hover:text-[#c9a96e] last:border-0 ${
                    cta ? 'text-[#c9a96e] font-medium' : 'text-white/95'
                  }`}
                >
                  {label}
                </a>
              ) : (
                <a
                  href={href}
                  onClick={closeMenu}
                  className={`block py-2.5 text-sm border-b border-white/5 transition-colors hover:text-[#c9a96e] last:border-0 ${
                    cta ? 'text-[#c9a96e] font-medium' : 'text-white/95'
                  }`}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
