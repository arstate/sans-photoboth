import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }
    
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Faster, snappier movement for Brutalist feel
      const speed = 0.3; 
      
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      cursorPosition.current.x += dx * speed;
      cursorPosition.current.y += dy * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
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
      setIsViewMode(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      // Square shape, Difference Blend mode
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center bg-white transition-[width,height] duration-150 ease-out will-change-transform ${
        isHovering ? 'w-24 h-24' : 'w-6 h-6'
      }`}
    >
      <span 
        className={`text-black font-black font-display text-[10px] uppercase tracking-widest transition-opacity duration-150 ${
          isViewMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        CLICK
      </span>
    </div>
  );
};

export default CustomCursor;