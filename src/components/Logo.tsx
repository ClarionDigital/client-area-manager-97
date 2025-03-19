
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <img 
          src="https://areadocliente.alternativacard.com/up/uploads/alt-67dac2db10c51.png" 
          alt="Alternativa Card Logo" 
          className={`${sizes[size]} object-contain filter drop-shadow-sm`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#52aa85]/10 to-transparent rounded-lg opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default Logo;
