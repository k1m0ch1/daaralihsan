import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TentangKami from './components/TentangKami'
import Program from './components/Program'
import JadwalSholat from './components/JadwalSholat'
import Donasi from './components/Donasi'
import Galeri from './components/Galeri'
import Kontak from './components/Kontak'
import Footer from './components/Footer'
import FloatingWA from './components/FloatingWA'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TentangKami />
      <Program />
      <JadwalSholat />
      <Donasi />
      <Galeri />
      <Kontak />
      <Footer />
      <FloatingWA />
    </>
  )
}
