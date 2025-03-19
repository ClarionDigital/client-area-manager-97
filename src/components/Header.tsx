
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showBackButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button 
            variant="outline" 
            onClick={() => navigate("/")} 
            className="gap-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-brand-darkest">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <Logo size="sm" />
    </div>
  );
};

export default Header;
