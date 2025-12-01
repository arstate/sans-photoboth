import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false); // State baru untuk teks "Lihat"
  const [isVisible, setIsVisible] = useState(false);
  
  // Menggunakan Ref untuk menyimpan posisi agar tidak memicu re-render React setiap frame
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // 0. Cek Mobile/Touch Device
    // Jika perangkat menggunakan pointer kasar (seperti jari di layar sentuh), fitur ini dimatikan.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsVisible(false);
      return; // Stop di sini, jangan jalankan listener atau animasi
    }
    
    setIsVisible(true);

    // 1. Event Listener Mouse Move (Hanya update data posisi, bukan render)
    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // 2. Animation Loop (Logika pergerakan smooth)
    const animate = () => {
      // Linear Interpolation (Lerp) untuk efek smooth
      const speed = 0.2; 
      
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      cursorPosition.current.x += dx * speed;
      cursorPosition.current.y += dy * speed;

      if (cursorRef.current) {
        // Menggunakan translate3d untuk akselerasi GPU
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // 3. Hover Detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Deteksi elemen interaktif (Tombol, Link, class cursor-scale/view, atau cursor pointer)
      // Sesuai request: Semua elemen yang bisa diklik akan memunculkan teks "Lihat"
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-scale') ||
        target.closest('.cursor-view') ||
        target.classList.contains('cursor-scale') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isInteractive);
      setIsViewMode(!!isInteractive); // Aktifkan teks "Lihat" untuk semua elemen interaktif
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Jika tidak visible (mobile), jangan render apa-apa
  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      // bg-gray-300 agar hasil invert tidak hitam pekat
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center rounded-full bg-gray-300 transition-[width,height] duration-300 ease-out will-change-transform ${
        isHovering ? 'w-24 h-24' : 'w-12 h-12'
      }`}
    >
      <span 
        className={`text-black font-bold text-[10px] uppercase tracking-widest transition-opacity duration-300 ${
          isViewMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Lihat
      </span>
    </div>
  );
};

export default CustomCursor;