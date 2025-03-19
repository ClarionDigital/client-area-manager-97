
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
      <img 
        src="https://areadocliente.alternativacard.com/up/uploads/alt-67dac2db10c51.png" 
        alt="Alternativa Card Logo" 
        className={`${sizes[size]}`}
      />
    </div>
  );
};

export default Logo;
