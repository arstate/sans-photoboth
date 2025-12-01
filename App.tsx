import React from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Button from './components/Button';
import CustomCursor from './components/CustomCursor';
import { Camera, Zap, Users, Monitor, Instagram, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { ServiceItem } from './types';

// Data Definitions
const services: ServiceItem[] = [
  {
    title: "Event Photobooth",
    description: "Solusi klasik untuk Wedding, Gathering, atau Sweet17. Menggunakan kamera Sony profesional & Studio Lighting.",
    icon: <Camera className="w-8 h-8 text-white" />,
    tags: ["Unlimited Print", "Custom Frame", "Fun Props"]
  },
  {
    title: "Mobile Photobooth",
    description: "Fotografer kami berkeliling (Roving) menangkap momen candid tamu Anda. Jemput bola, tanpa antre!",
    icon: <Users className="w-8 h-8 text-white" />,
    tags: ["Direct Share", "Candid", "Interactive"]
  },
  {
    title: "Self Photo Studio",
    description: "Studio mandiri dengan remote clicker. Privasi penuh untuk berekspresi bebas bersama bestie.",
    icon: <Zap className="w-8 h-8 text-white" />,
    tags: ["Privacy", "Retouch", "High Gen-Z Vibe"]
  },
  {
    title: "Software Solution",
    description: "Layanan B2B. Kami menyediakan lisensi software & sistem photobooth untuk vendor event lainnya.",
    icon: <Monitor className="w-8 h-8 text-white" />,
    tags: ["B2B", "White Label", "Tech Support"]
  }
];

const features = [
  "Hasil Foto Super HD & Glowing",
  "Share Softfile Instan via QR Code",
  "Basecamp Surabaya, Siap Keliling Jatim",
  "Template Desain Story-Driven"
];

function App() {
  const handleBooking = () => {
    window.open('https://wa.me/6288235479203?text=Halo%20Sans%20Photobooth,%20saya%20ingin%20tanya%20pricelist', '_blank');
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="font-sans text-gray-800 cursor-none">
      <CustomCursor />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="inline-block mb-4 animate-fade-in">
            <span className="px-4 py-1.5 rounded-full bg-purple-100 text-sans-purple font-bold text-xs md:text-sm tracking-widest uppercase shadow-sm">
              Surabaya Premium Photobooth
            </span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-gray-900 mb-6 leading-tight drop-shadow-sm">
            SANS<br />PHOTOBOOTH
          </h1>
          <p className="text-gray-600 text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Tiap Frame, Ada Cerita! Abadikan momen serumu dengan kualitas studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Tombol Booking: Hover jadi Kuning Teks Ungu */}
            <Button 
              variant="primary" 
              onClick={handleBooking} 
              className="shadow-purple-200 shadow-xl hover:bg-sans-yellow hover:text-sans-purple hover:shadow-yellow-200"
            >
              Booking Sekarang
            </Button>
            
            {/* Tombol Portfolio: Hover jadi Ungu Solid Teks Putih + Shadow */}
            <Button 
              variant="outline" 
              onClick={scrollToPortfolio}
              className="border-gray-300 text-gray-500 hover:bg-sans-purple hover:text-white hover:border-transparent hover:shadow-xl hover:shadow-purple-200"
            >
              Lihat Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-sans-bg relative">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="relative">
                 <div className="absolute inset-0 bg-sans-yellow rounded-3xl transform rotate-3 translate-x-2 translate-y-2"></div>
                 <img 
                   src="https://picsum.photos/600/400?random=1" 
                   alt="Sans Team" 
                   className="relative rounded-3xl w-full object-cover shadow-lg cursor-scale"
                 />
               </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-sans-purple font-bold uppercase tracking-wider mb-2">Tentang Kami</h3>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 text-gray-900">
                Lebih dari Sekadar Foto,<br/>Kami Menangkap <span className="text-sans-purple underline decoration-sans-yellow decoration-4 underline-offset-4">Emosi.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Sans Photobooth hadir di Surabaya dengan misi sederhana: membuat setiap tamu merasa seperti bintang. 
                Dengan filosofi <strong>"Tiap Frame, Ada Cerita"</strong>, kami menggabungkan teknologi fotografi terkini 
                dengan desain visual yang estetik ala Gen-Z. 
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Baik itu pernikahan sakral atau pesta ulang tahun yang pecah, tim kami siap memastikan 
                setiap senyum terabadikan dengan sempurna.
              </p>
              <div className="flex gap-4">
                 <div className="text-center">
                    <span className="block font-bold text-3xl text-sans-purple">500+</span>
                    <span className="text-sm text-gray-500">Event Handled</span>
                 </div>
                 <div className="w-px bg-gray-300 h-12"></div>
                 <div className="text-center">
                    <span className="block font-bold text-3xl text-sans-purple">10k+</span>
                    <span className="text-sm text-gray-500">Happy Faces</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl text-sans-purple mb-4">Layanan Kami</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Pilih paket yang paling pas buat acaramu. Semuanya garansi keren!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-sans-bg rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-100 border border-transparent hover:border-sans-purple/20 cursor-scale"
              >
                <div className="w-16 h-16 rounded-2xl bg-sans-purple flex items-center justify-center mb-6 shadow-lg group-hover:bg-sans-yellow group-hover:text-sans-purple transition-colors duration-300">
                  {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { 
                    className: "w-8 h-8 text-white group-hover:text-sans-purple transition-colors" 
                  })}
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed min-h-[80px]">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-white px-3 py-1 rounded-full text-sans-purple border border-purple-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-sans-dark text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sans-purple opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sans-yellow opacity-10 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="font-display font-black text-4xl md:text-5xl mb-8 leading-tight">
                Kenapa Harus <br/><span className="text-sans-yellow">Sans Photobooth?</span>
              </h2>
              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-scale">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-sans-dark">
                      <CheckCircle2 size={20} strokeWidth={3} />
                    </div>
                    <span className="font-semibold text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button variant="secondary" onClick={handleBooking}>Konsultasi Gratis</Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
               <img src="https://picsum.photos/300/400?random=2" className="rounded-3xl w-full h-64 object-cover transform translate-y-8 cursor-scale" alt="Feature 1" />
               <img src="https://picsum.photos/300/400?random=3" className="rounded-3xl w-full h-64 object-cover cursor-scale" alt="Feature 2" />
               <img src="https://picsum.photos/300/400?random=4" className="rounded-3xl w-full h-64 object-cover transform translate-y-8 cursor-scale" alt="Feature 3" />
               <img src="https://picsum.photos/300/400?random=5" className="rounded-3xl w-full h-64 object-cover cursor-scale" alt="Feature 4" />
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-24 bg-sans-bg">
        <div className="container mx-auto px-6 text-center">
           <h2 className="font-display font-bold text-4xl mb-2">Galeri Momen</h2>
           <p className="text-gray-500 mb-12">Intip keseruan teman-teman Sans yang sudah cobain!</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {/* NOTE: Ubah cursor-scale menjadi cursor-view hanya untuk elemen galeri agar teks "Lihat" muncul */}
              <div className="rounded-2xl overflow-hidden h-64 group relative cursor-view">
                <img src="https://picsum.photos/400/600?random=6" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery 1" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 group relative md:col-span-2 cursor-view">
                <img src="https://picsum.photos/800/600?random=7" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery 2" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 group relative cursor-view">
                <img src="https://picsum.photos/400/600?random=8" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery 3" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 group relative cursor-view">
                <img src="https://picsum.photos/400/600?random=9" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery 4" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 group relative cursor-view">
                <img src="https://picsum.photos/400/600?random=10" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery 5" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 group relative md:col-span-2 cursor-view">
                <img src="https://picsum.photos/800/600?random=11" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery 6" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
           </div>

           <Button variant="outline" onClick={() => window.open('https://instagram.com', '_blank')}>
              <Instagram className="w-5 h-5 mr-2" />
              Lihat Lebih Banyak di Instagram
           </Button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-white pt-24 pb-8 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="md:w-1/3">
              <h3 className="font-display font-black text-3xl tracking-tighter text-sans-purple mb-4">
                SANS<span className="text-sans-yellow">.</span>
              </h3>
              <p className="text-gray-500 mb-6">
                Abadikan setiap momen berharga dengan sentuhan estetik dan teknologi modern. Based in Surabaya, serving East Java.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-sans-lightPurple flex items-center justify-center text-sans-purple hover:bg-sans-purple hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            <div className="md:w-1/3">
               <h4 className="font-bold text-lg mb-6">Kontak Kami</h4>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3 text-gray-600">
                    <MapPin className="flex-shrink-0 text-sans-purple mt-1" size={20} />
                    <span>Surabaya, Jawa Timur, Indonesia.</span>
                 </li>
                 <li className="flex items-start gap-3 text-gray-600">
                    <Phone className="flex-shrink-0 text-sans-purple mt-1" size={20} />
                    <span>+62 882-3547-9203 (WhatsApp Only)</span>
                 </li>
                 <li className="flex items-start gap-3 text-gray-600">
                    <Instagram className="flex-shrink-0 text-sans-purple mt-1" size={20} />
                    <span>@sansphotobooth</span>
                 </li>
               </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Sans Photobooth. Tiap Frame, Ada Cerita!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;