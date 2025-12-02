import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  // Base: Bold border, hard shadow, no rounded corners usually (or small), uppercase
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 font-display font-bold text-sm tracking-wider uppercase border-2 border-black transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none";
  
  const variants = {
    // Primary: Purple bg, Black text or White text, hard shadow
    primary: "bg-sans-purple text-white shadow-neo hover:bg-purple-600 hover:shadow-neo",
    
    // Secondary: Acid Yellow bg, Black text
    secondary: "bg-sans-yellow text-black shadow-neo hover:bg-yellow-300 hover:shadow-neo",
    
    // Outline: White bg, Black text
    outline: "bg-white text-black shadow-neo hover:bg-gray-50 hover:shadow-neo"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;