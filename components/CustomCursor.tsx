import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use refs for direct DOM manipulation (better performance)
  const cursorPosition = useRef({ x: 0, y: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }
    
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Handle Scroll State
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Reset state after 150ms of no scrolling
    };

    const animate = () => {
      // Interpolation factor
      const speed = 0.2; 
      
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      cursorPosition.current.x += dx * speed;
      cursorPosition.current.y += dy * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-scale') ||
        target.closest('.cursor-view') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center"
      style={{ 
        marginLeft: 0, 
        marginTop: 0
      }}
    >
      {/* 
        STATE 1: DEFAULT ARROW 
        Visible when NOT hovering AND NOT scrolling.
      */}
      <div 
        className={`absolute top-0 left-0 transition-all duration-300 ease-out ${
          isHovering || isScrolling ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        } ${isClicking ? 'scale-90' : ''}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sharp Brutalist Arrow */}
          <path
            d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
            fill="black"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
        </svg>
      </div>

      {/* 
        STATE 2: SCROLLING (Pink Double Arrow)
        Visible when SCROLLING but NOT hovering.
      */}
      <div 
        className={`absolute transition-all duration-300 ease-out flex items-center justify-center ${
          isScrolling && !isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <div className="w-10 h-10 bg-sans-pink border-2 border-black rounded-full flex flex-col items-center justify-center relative shadow-sm gap-1">
           {/* Up Triangle */}
           <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white"></div>
           {/* Down Triangle */}
           <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white"></div>
        </div>
      </div>

      {/* 
        STATE 3: HOVER TARGET (Yellow Crosshair)
        Visible WHEN hovering (Highest Priority).
      */}
      <div 
        className={`absolute transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${isClicking ? 'scale-75' : ''}`}
      >
        <div className="w-10 h-10 bg-sans-yellow border-2 border-black rounded-full flex items-center justify-center relative shadow-sm">
           {/* Crosshair Vertical */}
           <div className="absolute w-[2px] h-4 bg-black"></div>
           {/* Crosshair Horizontal */}
           <div className="absolute w-4 h-[2px] bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;