import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Keunggulan', href: '#features' },
    { name: 'Kontak', href: '#contact' },
  ];

  const handleBooking = () => {
    window.open('https://wa.me/6288235479203?text=Halo%20Sans%20Photobooth,%20saya%20ingin%20tanya%20pricelist', '_blank');
    setIsMobileMenuOpen(false);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b-2 border-black ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-sm'
          : 'py-5 bg-sans-yellow'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - Full Name */}
        <a href="#" className="relative group" onClick={(e) => handleScrollTo(e, '#home')}>
          <div className="font-display font-black text-lg md:text-xl tracking-tighter text-black uppercase bg-white border-2 border-black px-3 py-1 shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex flex-col md:flex-row md:gap-2 leading-none">
            <span>SANS</span>
            <span className="text-sans-purple md:hidden">PHOTOBOOTH</span>
            <span className="text-sans-purple hidden md:inline">PHOTOBOOTH</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="font-bold font-sans text-sm uppercase tracking-wider text-black hover:bg-black hover:text-white px-2 py-1 transition-all border border-transparent hover:border-transparent"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={handleBooking}
            className="px-6 py-2 bg-sans-purple text-white font-bold text-sm border-2 border-black shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wide"
          >
            Booking Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none bg-white border-2 border-black p-1 shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-black" size={24} />
          ) : (
            <Menu className="text-black" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-2 border-black animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-black font-black font-display text-xl uppercase hover:bg-sans-yellow hover:pl-4 transition-all border-b-2 border-black pb-2"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleBooking}
              className="bg-sans-purple text-white w-full py-4 font-bold uppercase border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Booking Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;