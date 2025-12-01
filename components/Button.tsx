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
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-sans-purple text-white shadow-lg shadow-purple-200 hover:shadow-purple-400 focus:ring-sans-purple",
    secondary: "bg-sans-yellow text-sans-purple shadow-lg shadow-yellow-100 hover:bg-yellow-300 hover:shadow-yellow-300 focus:ring-sans-yellow",
    outline: "border-2 border-sans-purple text-sans-purple hover:bg-sans-purple hover:text-white focus:ring-sans-purple"
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
