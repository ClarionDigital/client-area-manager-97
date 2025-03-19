
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
    >
      <Download className="mr-2 h-4 w-4" />
      Exportar dados
    </Button>
  );
};

export default ExportButton;
