const categories = [
  { icon: '🕌', label: 'Operasional Masjid', desc: 'Listrik, air, kebersihan, dan kebutuhan harian masjid.' },
  { icon: '📚', label: 'Program Dakwah', desc: 'Mendukung kajian, TPA, dan program pendidikan Islam.' },
  { icon: '🏗️', label: 'Pembangunan', desc: 'Pengembangan fasilitas dan infrastruktur masjid.' },
  { icon: '💚', label: 'Sosial & Yatim', desc: 'Bantuan sosial, santunan yatim, dan duafa.' },
]

const bankAccounts = [
  { bank: 'Bank Syariah Indonesia (BSI)', no: '1234567890', name: 'Masjid Daar Al-Ihsan' },
  { bank: 'Bank BRI', no: '0987654321', name: 'DKM Daar Al-Ihsan' },
]

export default function Donasi() {
  return (
    <section id="donasi" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
            Infaq &amp; Sedekah
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Donasi &amp; Wakaf
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Setiap donasi Anda adalah investasi akhirat. Bersama kita bangun
            masjid yang memberi manfaat nyata bagi umat.
          </p>
          <p className="arabic-text text-xl text-emerald-700 mt-4">
            مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ
          </p>
          <p className="text-xs text-gray-400 mt-1">QS. Al-Baqarah: 261</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Donation categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Pilihan Donasi</h3>
            <div className="space-y-3">
              {categories.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700">{c.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank accounts */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Transfer via Bank</h3>
            <div className="space-y-3 mb-6">
              {bankAccounts.map((b) => (
                <div key={b.no} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">{b.bank}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1 tracking-wider">{b.no}</p>
                  <p className="text-sm text-gray-600 mt-0.5">a.n. {b.name}</p>
                </div>
              ))}
            </div>

            {/* QRIS placeholder */}
            <div className="p-5 border-2 border-dashed border-amber-300 bg-amber-50 rounded-2xl text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto flex items-center justify-center">
                <p className="text-gray-400 text-xs font-medium">QRIS<br/>Coming Soon</p>
              </div>
              <p className="text-sm font-semibold text-amber-700 mt-3">Scan QRIS</p>
              <p className="text-xs text-amber-600 mt-0.5">Segera tersedia</p>
            </div>

            {/* Confirmation WhatsApp */}
            <a
              href="https://wa.me/62?text=Assalamu'alaikum%2C%20saya%20ingin%20konfirmasi%20donasi%20untuk%20Masjid%20Daar%20Al-Ihsan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Konfirmasi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
