
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
      className="border-[#52aa85] text-[#52aa85] hover:bg-[#52aa85] hover:text-white"
    >
      <Download className="mr-2 h-4 w-4" />
      Exportar dados
    </Button>
  );
};

export default ExportButton;
