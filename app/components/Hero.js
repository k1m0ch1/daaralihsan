import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background foto masjid dari Google Maps */}
      <div className="absolute inset-0">
        <Image
          src="/banner-masjid.jpg"
          alt="Masjid Daar Al-Ihsan Cimahi"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay supaya teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/75 to-emerald-950/90" />
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-bg opacity-30" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
        {/* Arabic bismillah */}
        <p className="arabic-text text-3xl text-amber-300 mb-6 leading-relaxed drop-shadow-lg">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          Diresmikan 1 Oktober 2023 · Cimahi Utara
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Masjid{' '}
          <span className="text-amber-300">Daar Al-Ihsan</span>
        </h1>

        <p className="text-xl sm:text-2xl text-emerald-100 font-light mb-4">
          Bersama Untuk Menjadi Lebih Baik
        </p>

        <p className="text-base sm:text-lg text-emerald-200/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Membangun Generasi Rabbani melalui Dakwah, Pendidikan, Sosial &amp; Ekonomi
          di jantung Cimahi Utara.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#program"
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-amber-400/40 hover:scale-105"
          >
            Lihat Program Kami
          </a>
          <a
            href="#donasi"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full transition-all duration-200"
          >
            Donasi &amp; Infaq
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: '2023', label: 'Diresmikan' },
            { value: '12.4K+', label: 'Followers IG' },
            { value: '4.9★', label: 'Rating (177)' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white drop-shadow">{s.value}</p>
              <p className="text-xs text-emerald-200 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
