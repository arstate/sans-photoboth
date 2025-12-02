import React from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Button from './components/Button';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/ChatWidget';
import { Camera, Zap, Users, Monitor, Instagram, Check, MapPin, Phone, Star, ArrowRight } from 'lucide-react';
import { ServiceItem } from './types';

// Data Definitions
const services: ServiceItem[] = [
  {
    title: "Event Photobooth",
    description: "Wedding, Gathering, Sweet17? Gas! Pake Sony Alpha + Studio Lighting biar muka lo glowing.",
    icon: <Camera className="w-6 h-6" />,
    tags: ["Unlimited Print", "Custom Frame"]
  },
  {
    title: "Mobile / Roving",
    description: "Fotografer kita keliling nyamperin tamu. Candid moment dapet, gak pake antre.",
    icon: <Users className="w-6 h-6" />,
    tags: ["Direct Share", "Candid Style"]
  },
  {
    title: "Self Photo Studio",
    description: "Studio mandiri, remote di tangan. Bebas gaya gila-gilaan tanpa diliatin abang foto.",
    icon: <Zap className="w-6 h-6" />,
    tags: ["Privacy", "Gen-Z Vibe"]
  },
  {
    title: "Software B2B",
    description: "Vendor lain mau pake sistem kita? Bisa banget. White label available.",
    icon: <Monitor className="w-6 h-6" />,
    tags: ["Lisensi", "Tech Support"]
  }
];

const features = [
  "Hasil Foto Super HD",
  "Share Softfile QR Code",
  "Basecamp Surabaya",
  "Desain Frame Estetik"
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
    <div className="font-sans text-black bg-white min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <ChatWidget />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b-4 border-black bg-[#F3F4F6]">
        <div className="absolute inset-0 z-0">
           <Hero3D />
        </div>
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto mt-20 md:mt-16">
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in bg-white border-2 border-black px-4 py-2 shadow-neo-sm transform -rotate-2 hover:rotate-0 transition-transform">
            <Star className="w-4 h-4 text-sans-purple fill-current" />
            <span className="text-black font-bold text-xs md:text-sm tracking-widest uppercase font-display">
              Surabaya Premium Photobooth
            </span>
            <Star className="w-4 h-4 text-sans-purple fill-current" />
          </div>
          
          {/* Main Title - Responsive sizing to prevent cut-off */}
          <h1 className="font-display font-black text-black mb-6 leading-[0.9] tracking-tighter mix-blend-hard-light uppercase drop-shadow-[3px_3px_0px_rgba(255,255,255,1)] md:drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            <span className="block text-6xl md:text-8xl lg:text-9xl">SANS</span>
            {/* Reduced text size to 10vw to safely fit Mobile Portrait without cutoff */}
            <span 
              className="block text-[10vw] md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-sans-purple via-sans-pink to-sans-yellow stroke-black" 
              style={{ WebkitTextStroke: '1.5px black' }} 
            >
              PHOTOBOOTH
            </span>
          </h1>
          
          <p className="bg-white inline-block border-2 border-black px-4 py-2 text-black text-base md:text-xl mb-10 max-w-2xl mx-auto font-medium shadow-neo-sm">
            Tiap Frame, Ada Cerita! Abadikan momen gila lo sekarang.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button variant="secondary" onClick={handleBooking} className="text-lg px-10 py-4">
              Booking Sekarang
            </Button>
            <Button variant="outline" onClick={scrollToPortfolio} className="text-lg px-10 py-4">
              Lihat Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* --- RUNNING TEXT MARQUEE --- */}
      {/* 
          Sticky positioning adjustment:
          Mobile Navbar Height: ~58px (py-3 + content + borders)
          Desktop Navbar Height: ~67px
      */}
      <div className="bg-sans-purple border-b-4 border-black overflow-hidden py-3 whitespace-nowrap sticky top-[58px] md:top-[67px] z-40">
        {/* Slowed down animation to 40s */}
        <div className="inline-block animate-[marquee_40s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
             <span key={i} className="text-white font-display font-black text-xl mx-8 uppercase tracking-wider">
               Tiap Frame Ada Cerita <span className="text-sans-yellow mx-2">★</span> Capture Your Moment <span className="text-sans-yellow mx-2">★</span>
             </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-0 md:gap-8 items-stretch">
            {/* Image Card */}
            <div className="w-full md:w-1/2 relative group">
               <div className="absolute inset-0 bg-sans-dark translate-x-4 translate-y-4 border-2 border-black"></div>
               <div className="relative h-full bg-white border-2 border-black p-2 z-10 transition-transform hover:-translate-y-1 hover:-translate-x-1">
                 <img 
                   src="https://picsum.photos/600/400?random=1" 
                   alt="Sans Team" 
                   className="w-full h-full object-cover border-2 border-black grayscale group-hover:grayscale-0 transition-all duration-300"
                 />
               </div>
            </div>
            
            {/* Text Content */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0 flex flex-col justify-center">
              <div className="bg-sans-yellow border-2 border-black inline-block px-4 py-1 mb-4 shadow-neo-sm w-max">
                <h3 className="font-bold uppercase tracking-wider text-sm">Tentang Kami</h3>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-6 leading-tight">
                BUKAN PHOTOBOOTH <br/>
                <span className="bg-sans-purple text-white px-2">BIASA.</span>
              </h2>
              <p className="text-black font-medium leading-relaxed mb-6 text-lg border-l-4 border-sans-pink pl-4">
                Sans Photobooth hadir buat lo yang bosen sama foto kaku. Misi kita simpel: bikin lo berasa kayak rockstar di event sendiri.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 font-sans">
                Filosofi kita <strong>"Tiap Frame, Ada Cerita"</strong>. Gabungin teknologi canggih, lighting studio pro, dan desain frame yang gak norak. Gas pol buat wedding, sweet17, atau gathering kantor.
              </p>
              
              <div className="flex gap-4">
                 <div className="flex-1 bg-white border-2 border-black p-4 text-center shadow-neo-sm hover:shadow-none transition-all hover:translate-x-[2px] hover:translate-y-[2px]">
                    <span className="block font-display font-black text-4xl text-sans-purple">500+</span>
                    <span className="text-xs font-bold uppercase mt-1 block">Event Hajar</span>
                 </div>
                 <div className="flex-1 bg-white border-2 border-black p-4 text-center shadow-neo-sm hover:shadow-none transition-all hover:translate-x-[2px] hover:translate-y-[2px]">
                    <span className="block font-display font-black text-4xl text-sans-pink">10k+</span>
                    <span className="text-xs font-bold uppercase mt-1 block">Happy Faces</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-sans-yellow border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b-4 border-black pb-4">
            <h2 className="font-display font-black text-5xl md:text-6xl text-black">LAYANAN</h2>
            <p className="hidden md:block font-bold text-xl uppercase max-w-md text-right">Pilih paket sesuka hati. Garansi keren 100%.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-black p-6 shadow-neo hover:shadow-neo-lg hover:-translate-y-2 transition-all duration-200 flex flex-col cursor-scale"
              >
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  {service.icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-3 uppercase leading-none">{service.title}</h3>
                <p className="text-gray-800 mb-6 text-sm font-medium border-t-2 border-black pt-3 mt-auto">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold bg-sans-lightPurple px-2 py-1 border border-black text-black uppercase">
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
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="font-display font-black text-5xl mb-8 leading-none">
                KENAPA HARUS <br/>
                <span className="text-sans-purple underline decoration-sans-yellow decoration-8 underline-offset-4">SANS PB?</span>
              </h2>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="group flex items-center gap-4 p-4 border-2 border-black bg-white shadow-neo-sm hover:bg-black hover:text-white transition-colors cursor-scale">
                    <div className="flex-shrink-0 w-8 h-8 bg-sans-yellow border-2 border-black flex items-center justify-center text-black group-hover:bg-white">
                      <Check size={20} strokeWidth={4} />
                    </div>
                    <span className="font-bold text-lg uppercase tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button variant="primary" onClick={handleBooking} className="w-full md:w-auto">
                   Konsultasi Gratis <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sans-pink border-2 border-black p-2 shadow-neo h-64 rotate-2 z-10">
                     <img src="https://picsum.photos/300/400?random=2" className="w-full h-full object-cover border border-black grayscale hover:grayscale-0 transition-all" alt="Feature 1" />
                  </div>
                  <div className="bg-sans-yellow border-2 border-black p-2 shadow-neo h-64 -rotate-3 mt-12 z-0">
                     <img src="https://picsum.photos/300/400?random=3" className="w-full h-full object-cover border border-black grayscale hover:grayscale-0 transition-all" alt="Feature 2" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-24 bg-[#F3F4F6] border-t-4 border-black">
        <div className="container mx-auto px-6 text-center">
           <div className="inline-block bg-black text-white px-6 py-2 mb-4 border-2 border-sans-purple shadow-neo-sm transform -rotate-1">
             <h2 className="font-display font-bold text-3xl uppercase">Galeri Momen</h2>
           </div>
           <p className="text-black font-bold mb-12 uppercase tracking-wide">Intip keseruan teman-teman Sans yang sudah cobain!</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[6, 7, 8, 9, 10, 11].map((num, idx) => (
                <div key={num} className={`relative border-2 border-black bg-white p-2 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-view group ${idx === 1 || idx === 5 ? 'md:col-span-2' : ''}`}>
                  <div className="w-full h-64 overflow-hidden border border-black">
                    <img src={`https://picsum.photos/${idx === 1 || idx === 5 ? '800' : '600'}/600?random=${num}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" alt="Gallery" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white border-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Instagram className="w-5 h-5" />
                  </div>
                </div>
              ))}
           </div>

           <Button variant="outline" onClick={() => window.open('https://instagram.com', '_blank')}>
              <Instagram className="w-5 h-5 mr-2" />
              Follow Instagram
           </Button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-black text-white pt-20 pb-8 border-t-4 border-sans-purple relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="md:w-1/3">
              {/* Responsive Text Size to avoid cropping on mobile */}
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white mb-4 uppercase leading-none break-words">
                SANS<span className="text-sans-purple">.</span>PHOTOBOOTH
              </h3>
              <p className="text-gray-400 mb-6 font-mono text-sm border-l-2 border-sans-purple pl-4">
                Abadikan setiap momen berharga dengan sentuhan estetik dan teknologi modern. Based in Surabaya, serving East Java.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white border-2 border-transparent text-black flex items-center justify-center hover:bg-sans-purple hover:text-white hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <Instagram size={24} />
                </a>
                {/* Changed green button to yellow to match theme */}
                <a href="#" className="w-12 h-12 bg-sans-yellow border-2 border-transparent text-black flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <Phone size={24} />
                </a>
              </div>
            </div>

            <div className="md:w-1/3">
               <h4 className="font-display font-bold text-xl mb-6 uppercase text-sans-yellow">Kontak Kami</h4>
               <ul className="space-y-4 font-mono text-sm">
                 <li className="flex items-start gap-3">
                    <MapPin className="flex-shrink-0 text-sans-purple" size={20} />
                    <span>Surabaya, Jawa Timur, Indonesia.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <Phone className="flex-shrink-0 text-sans-purple" size={20} />
                    <span>+62 882-3547-9203 (WhatsApp Only)</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <Instagram className="flex-shrink-0 text-sans-purple" size={20} />
                    <span>@sansphotobooth</span>
                 </li>
               </ul>
            </div>
          </div>

          <div className="border-t-2 border-white/20 pt-8 text-center text-gray-500 text-xs font-mono uppercase tracking-widest">
            <p>© 2024 Sans Photobooth. Designed with Brutal Love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;