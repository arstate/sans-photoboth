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
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Keunggulan', href: '#features' },
    { name: 'Kontak', href: '#contact' },
  ];

  // Fungsi untuk membuka WhatsApp (Sama seperti di Hero Section)
  const handleBooking = () => {
    window.open('https://wa.me/6288235479203?text=Halo%20Sans%20Photobooth,%20saya%20ingin%20tanya%20pricelist', '_blank');
    setIsMobileMenuOpen(false); // Menutup menu mobile jika sedang terbuka
  };

  // Fungsi untuk scroll manual dengan offset navbar
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Tinggi navbar
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-lg'
          : 'py-6 bg-sans-purple shadow-md'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="relative group" onClick={(e) => handleScrollTo(e, '#home')}>
          <span className={`font-display font-black text-2xl tracking-tighter ${
            isScrolled ? 'text-sans-purple' : 'text-white'
          }`}>
            SANS
            <span className="text-sans-yellow">.</span>
            PHOTOBOOTH
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`font-semibold text-sm tracking-wide transition-colors duration-200 hover:text-sans-yellow ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={handleBooking}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-transform hover:scale-105 ${
              isScrolled
                ? 'bg-sans-purple text-white hover:bg-purple-800'
                : 'bg-sans-yellow text-sans-purple hover:bg-yellow-300'
            }`}
          >
            Booking Sekarang
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-sans-purple' : 'text-white'} size={28} />
          ) : (
            <Menu className={isScrolled ? 'text-sans-purple' : 'text-white'} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-3xl overflow-hidden md:hidden animate-fade-in-down border-t border-gray-100">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-gray-800 font-semibold text-lg hover:text-sans-purple py-2"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleBooking}
              className="bg-sans-purple text-white text-center py-3 rounded-xl font-bold mt-4 block w-full hover:bg-purple-800 transition-colors"
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