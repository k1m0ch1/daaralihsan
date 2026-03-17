'use client'
import { useState, useEffect } from 'react'

const PRAYERS = [
  { name: 'Subuh', key: 'Fajr', icon: '🌙', color: 'bg-indigo-50 border-indigo-200' },
  { name: 'Dzuhur', key: 'Dhuhr', icon: '☀️', color: 'bg-yellow-50 border-yellow-200' },
  { name: 'Ashar', key: 'Asr', icon: '🌤️', color: 'bg-orange-50 border-orange-200' },
  { name: 'Maghrib', key: 'Maghrib', icon: '🌅', color: 'bg-rose-50 border-rose-200' },
  { name: "Isya'", key: 'Isha', icon: '🌃', color: 'bg-slate-50 border-slate-200' },
]

// Fallback static times for Cimahi
const FALLBACK = {
  Fajr: '04:57',
  Dhuhr: '11:58',
  Asr: '15:09',
  Maghrib: '18:02',
  Isha: '18:59',
}

function formatTime(t) {
  if (!t) return '--:--'
  const [h, m] = t.split(':')
  return `${h}:${m}`
}

export default function JadwalSholat() {
  const [timings, setTimings] = useState(null)
  const [dateLabel, setDateLabel] = useState('')
  const [loading, setLoading] = useState(true)
  const [nextPrayer, setNextPrayer] = useState(null)

  useEffect(() => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    setDateLabel(`${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${yyyy}`)

    fetch(
      `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=-6.8546641&longitude=107.5552907&method=11`
    )
      .then((r) => r.json())
      .then((data) => {
        const t = data?.data?.timings
        if (t) setTimings(t)
        else setTimings(FALLBACK)
      })
      .catch(() => setTimings(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  // Determine next prayer
  useEffect(() => {
    if (!timings) return
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    for (const p of PRAYERS) {
      const [h, m] = formatTime(timings[p.key]).split(':').map(Number)
      if (h * 60 + m > nowMinutes) {
        setNextPrayer(p.key)
        break
      }
    }
  }, [timings])

  return (
    <section id="jadwal" className="py-16 bg-emerald-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-amber-300 text-sm font-semibold uppercase tracking-widest">
            Waktu Sholat Hari Ini
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">Jadwal Sholat</h2>
          {dateLabel && (
            <p className="text-emerald-200 mt-1 text-sm">{dateLabel} · Kota Cimahi, Jawa Barat</p>
          )}
        </div>

        {/* Prayer cards */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {PRAYERS.map((p) => {
              const isNext = nextPrayer === p.key
              return (
                <div
                  key={p.key}
                  className={`relative rounded-2xl p-4 text-center border transition-all ${
                    isNext
                      ? 'bg-amber-400 border-amber-300 shadow-lg shadow-amber-400/40 scale-105'
                      : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15'
                  }`}
                >
                  {isNext && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      Berikutnya
                    </span>
                  )}
                  <span className="text-2xl">{p.icon}</span>
                  <p className={`font-semibold mt-2 text-sm ${isNext ? 'text-emerald-900' : 'text-white'}`}>
                    {p.name}
                  </p>
                  <p className={`text-xl font-bold mt-1 ${isNext ? 'text-emerald-900' : 'text-amber-300'}`}>
                    {formatTime(timings?.[p.key])}
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {/* Jumat special */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🕌</span>
            <div>
              <p className="font-bold text-white">Sholat Jum'at</p>
              <p className="text-emerald-200 text-sm">Khutbah dimulai pukul 12:00 WIB</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-2xl font-bold text-amber-300">12:30</p>
            <p className="text-emerald-200 text-xs">Iqamah</p>
          </div>
        </div>
      </div>
    </section>
  )
}
