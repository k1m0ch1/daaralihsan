import { Poppins, Amiri } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

export const metadata = {
  title: 'Masjid Daar Al-Ihsan — Bersama Untuk Menjadi Lebih Baik',
  description:
    'Masjid Daar Al-Ihsan, Cimahi Utara. Pusat ibadah, dakwah, pendidikan, dan pemberdayaan umat. Jl. Permana Utara, Citeureup, Kota Cimahi, Jawa Barat.',
  keywords: 'Masjid Daar Al Ihsan, Cimahi, masjid Cimahi Utara, kajian, TPA, IRMA',
  openGraph: {
    title: 'Masjid Daar Al-Ihsan Cimahi',
    description: 'Bersama Untuk Menjadi Lebih Baik',
    url: 'https://daaralihsan.com',
    siteName: 'Masjid Daar Al-Ihsan',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${amiri.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
