import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Button from './components/Button';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/ChatWidget';
import { Camera, Zap, Users, Monitor, Instagram, Check, MapPin, Phone, Star, ArrowRight, X, ExternalLink, Maximize } from 'lucide-react';
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
    tags: ["Lisensi", "Tech Support"],
    demoUrl: "https://sansphoto.vercel.app/" // Link Demo
  }
];

const features = [
  "Hasil Foto Super HD",
  "Share Softfile QR Code",
  "Basecamp Surabaya",
  "Desain Frame Estetik"
];

const galleryImages = [
  "https://lh3.googleusercontent.com/pw/AP1GczNXLt6eumNBDy2GufzXKMxgOA9BvDxVQZPg7vnhz1RMVEpuUokI77yfdpErFqQNd93CslOGmWxOV6W83L8n3z-bwEVr2cxfyOtVTge3DnTW2850RhU=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczNHOECcuYnhgSoMRkuQ4P8vx59n2LmWjZOr2JBNU7u4oegApL9ABA_ikDPQ6RXEIE0-4nSvDn4USNQE_Edo2Adzr406vVtgCEE3z0JSL1qdUGJy_ho=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczN5qAn7eg7C55Dwx10bJvFXl8TSSdqGutjO7j4IcKTIJrkLPAoGQXfofv9Ym0ItWvc_jKlBKvN8SooxR9Txy4qB1dxfmIaHiO4Toiacrhnl3uH7OkM=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPFPFVe-a_DWi_0aLh2tTRsCztvvcGzxHlJhG4zxkyFogypPnqEC5sgNeVIsRcxhPhJ9A3yjS4hssYoiGWkV2s08YNy_LhdseCC2bfmC7o6mDi0OAU=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczM3Woe-RNUS2Ro1iGfJWyr6Q7kReYw0yoh5izfLDX3mezxeF6dPE3Lpw28zTQ6ZNx9c4al-WKjW63je5YUhB6P69Mf4e1AvqEzdNfUDeuUMDmIK3f8=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczObYNf9N3O6PqAJwfweM0LqPW3u7irIKY9Fne-MaJ1GQE1C2onjF8DBFOYvY9uYHhQJNmdRjxtMnP8AZ5HpfDqjsjpg_0vGgxuTV2nDAzl3LovOz-Q=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczP31L3PKZsuhfAhpJ9J6ZPemMKdP4ZH76vyZlw8mwk0EQ0iNS0DsSjNYO1jXr5yAHRW_5WNFAEcplrI9RLECV9z7lMhT3uf5KRIhf2_Lfso2YFh1nw=w2400"
];

function App() {
  const [activeDemoUrl, setActiveDemoUrl] = useState<string | null>(null);
  const [showDemoToast, setShowDemoToast] = useState(false);

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

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showDemoToast) {
      const timer = setTimeout(() => {
        setShowDemoToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showDemoToast]);

  return (
    <div className="font-sans text-black bg-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <ChatWidget />

      {/* --- DEMO POPUP MODAL --- */}
      {activeDemoUrl && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="w-full h-full max-w-7xl max-h-[90vh] bg-white border-2 border-black shadow-neo-lg flex flex-col relative">
            
            {/* Notification Toast Overlay */}
            {showDemoToast && (
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-[90%] md:w-auto">
                <div className="bg-sans-yellow border-2 border-black p-3 md:p-4 shadow-neo flex items-center gap-3 justify-center">
                  <Maximize className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="font-bold font-mono text-xs md:text-sm uppercase tracking-tight md:tracking-wide leading-tight">
                    Tips: Klik Fullscreen di dalam aplikasi biar makin asik!
                  </span>
                </div>
              </div>
            )}

            {/* Modal Header */}
            <div className="bg-sans-purple border-b-2 border-black p-3 flex justify-between items-center text-white">
               <div className="flex items-center gap-2">
                 <Monitor size={18} />
                 <span className="font-bold font-display uppercase tracking-wider text-sm md:text-base">Live Demo Preview</span>
               </div>
               <div className="flex gap-2">
                 <button 
                   onClick={() => setActiveDemoUrl(null)}
                   className="p-1 hover:bg-white hover:text-red-600 border border-transparent hover:border-black transition-colors"
                 >
                   <X size={20} />
                 </button>
               </div>
            </div>
            
            {/* Iframe Container */}
            <div className="flex-1 bg-gray-100 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest pointer-events-none z-0">
                 Loading Experience...
               </div>
               <iframe 
                 src={activeDemoUrl} 
                 className="w-full h-full relative z-10"
                 allow="camera; microphone; fullscreen; display-capture"
                 title="Sans Photobooth Demo"
               />
            </div>
          </div>
        </div>
      )}

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
          Reduced top values slightly to ensure overlap under navbar (no gaps).
          Mobile: top-[52px]
          Desktop: top-[64px]
      */}
      <div className="bg-sans-purple border-b-4 border-black overflow-hidden py-3 whitespace-nowrap sticky top-[52px] md:top-[64px] z-40">
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
                    <span className="text-xs font-bold uppercase mt-1 block">Event di Hajar</span>
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
                className="bg-white border-2 border-black p-6 shadow-neo hover:shadow-neo-lg hover:-translate-y-2 transition-all duration-200 flex flex-col cursor-scale relative group"
              >
                {/* TRY NOW BUTTON (Condition: Only if demoUrl exists) */}
                {service.demoUrl && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDemoUrl(service.demoUrl!);
                      setShowDemoToast(true);
                    }}
                    className="absolute top-0 right-0 m-3 bg-black text-white text-[10px] md:text-xs font-bold px-2 py-1 border border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all z-20 flex items-center gap-1 animate-pulse"
                  >
                    TRY NOW <ExternalLink size={10} />
                  </button>
                )}

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
                <span className="text-sans-purple underline decoration-sans-yellow decoration-8 underline-offset-4">SANS?</span>
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
           
           {/* 
              MASONRY LAYOUT IMPLEMENTATION:
              - Mobile: columns-2 (2 columns side by side for portrait photos)
              - Tablet: md:columns-3 (3 columns)
              - Desktop: lg:columns-4 (4 columns for denser look)
              - gap-4: Reduced gap to fit 2 cols nicely on mobile
           */}
           <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mb-12 mx-auto max-w-7xl text-left">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="break-inside-avoid relative border-2 border-black bg-white p-1 md:p-2 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-view group mb-4">
                  {/* Container without fixed height to respect Aspect Ratio */}
                  <div className="w-full border border-black overflow-hidden bg-gray-200">
                    <img 
                      src={src} 
                      className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500" 
                      alt={`Gallery Moment ${idx + 1}`} 
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-white border-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              ))}
           </div>

           <Button variant="outline" onClick={() => window.open('https://instagram.com/sansphotobooth', '_blank')}>
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
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white mb-4 uppercase leading-tight break-words">
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