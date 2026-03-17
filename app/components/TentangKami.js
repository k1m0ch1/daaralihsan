const features = [
  { icon: '📖', title: 'Pusat Ilmu', desc: 'Kajian rutin, tahsin, dan tafsir Al-Qur\'an untuk semua kalangan.' },
  { icon: '🤝', title: 'Sosial Keumatan', desc: 'Program bantuan sosial dan pemberdayaan masyarakat sekitar.' },
  { icon: '👶', title: 'Pendidikan Anak', desc: 'TPA dan Madrasah anak untuk generasi Qur\'ani sejak dini.' },
  { icon: '🌱', title: 'Dakwah & Tarbiyah', desc: 'Program tarbiyah dan dakwah untuk membentuk karakter Islami.' },
]

export default function TentangKami() {
  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-5 leading-tight">
              Membangun Generasi{' '}
              <span className="text-emerald-700">Rabbani</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Masjid Daar Al-Ihsan berdiri di atas semangat <em>"Bersama Untuk Menjadi Lebih Baik"</em>.
              Diresmikan pada 1 Oktober 2023 oleh PJ Wali Kota Cimahi, masjid ini hadir sebagai
              pusat ibadah sekaligus pusat pemberdayaan umat di Cimahi Utara.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Berlokasi di Jl. Permana Utara, Kelurahan Citeureup, kami berkomitmen menjadi
              tempat yang adaptif terhadap perkembangan zaman — tetap menjaga nilai-nilai Islam
              sembari aktif berkontribusi untuk masyarakat luas.
            </p>

            {/* Vision/Mission */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-700 text-xs font-bold">V</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Visi</p>
                  <p className="text-gray-600 text-sm">Menjadi pusat peradaban Islam yang melahirkan generasi Rabbani yang bermanfaat bagi umat dan bangsa.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-xs font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Misi</p>
                  <p className="text-gray-600 text-sm">Membangun generasi Rabbani melalui dakwah, pendidikan, sosial, dan ekonomi umat.</p>
                </div>
              </div>
            </div>

            <a
              href="#kontak"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full transition-colors"
            >
              Kunjungi Kami
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-emerald-200 transition-all group"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-1 group-hover:text-emerald-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
