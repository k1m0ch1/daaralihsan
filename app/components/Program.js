const programs = [
  {
    emoji: '📚',
    title: 'Kajian Ilmu',
    schedule: 'Rutin mingguan',
    desc: 'Kajian kitab dan ta\'lim bersama ustadz pilihan. Terbuka untuk umum, laki-laki maupun perempuan.',
    color: 'emerald',
  },
  {
    emoji: '📖',
    title: 'Tahsin Al-Qur\'an',
    schedule: 'Setiap hari 07:30',
    desc: 'Program perbaikan bacaan Al-Qur\'an dengan metode talaqqi. Tersedia untuk anak-anak hingga dewasa.',
    color: 'blue',
  },
  {
    emoji: '🌙',
    title: 'Qiyamul Lail',
    schedule: 'Malam hari',
    desc: 'Program menghidupkan malam dengan sholat tahajud dan taqarrub ilallah bersama jamaah.',
    color: 'purple',
  },
  {
    emoji: '🕌',
    title: "I'tikaf Ramadhan",
    schedule: '10 malam terakhir',
    desc: "I'tikaf intensif selama 10 hari terakhir Ramadhan. Penuh kekhusyu'an dan tarbiyah Qur'aniyah.",
    color: 'amber',
  },
  {
    emoji: '👦',
    title: 'TPA & Madrasah',
    schedule: 'Sore hari',
    desc: 'Taman Pendidikan Al-Qur\'an dan Madrasah Anak untuk mencetak generasi Qur\'ani sejak kecil.',
    color: 'green',
  },
  {
    emoji: '🌟',
    title: 'IRMA',
    schedule: 'Kegiatan mingguan',
    desc: 'Ikatan Remaja Masjid — wadah remaja berkegiatan positif, outbound, kajian remaja, dan pengabdian masyarakat.',
    color: 'rose',
  },
  {
    emoji: '💚',
    title: 'Program Sosial',
    schedule: 'Sepanjang tahun',
    desc: 'Bantuan bagi anggota jamaah yang membutuhkan, santunan anak yatim, dan kegiatan sosial kemasyarakatan.',
    color: 'teal',
  },
  {
    emoji: '📜',
    title: 'Wakaf Mushaf',
    schedule: 'Program wakaf',
    desc: 'Program wakaf Al-Qur\'an untuk disebarkan ke masjid, pesantren, dan pelosok yang membutuhkan.',
    color: 'indigo',
  },
]

const colorMap = {
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  green: 'bg-green-50 border-green-200 text-green-700',
  rose: 'bg-rose-50 border-rose-200 text-rose-700',
  teal: 'bg-teal-50 border-teal-200 text-teal-700',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
}

export default function Program() {
  return (
    <section id="program" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">
            Kegiatan Rutin
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Program Masjid
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Berbagai program untuk membina umat — dari kajian ilmu, pendidikan anak,
            hingga kegiatan sosial dan pemberdayaan remaja.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border text-2xl mb-4 ${colorMap[p.color]}`}>
                {p.emoji}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs font-medium text-emerald-600 mb-2">{p.schedule}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/daar_al_ihsan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-full hover:bg-emerald-700 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Info Lengkap di Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
