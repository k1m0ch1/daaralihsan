'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#program', label: 'Program' },
  { href: '#jadwal', label: 'Jadwal Sholat' },
  { href: '#donasi', label: 'Donasi' },
  { href: '#kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0">
              <Image
                src="/logo-daralihsan.jpg"
                alt="Logo Masjid Daar Al-Ihsan"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="leading-tight">
              <p className={`font-bold text-sm ${scrolled ? 'text-emerald-800' : 'text-white'}`}>
                Daar Al-Ihsan
              </p>
              <p className={`text-xs ${scrolled ? 'text-gray-500' : 'text-emerald-100'}`}>
                Cimahi Utara
              </p>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                  scrolled ? 'text-gray-700 hover:text-emerald-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/62"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/62"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg text-center"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
