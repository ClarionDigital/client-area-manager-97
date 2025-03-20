
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Link as LinkIcon, Copy, Check } from "lucide-react";
import UploadSpreadsheet from "@/components/admin/UploadSpreadsheet";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  title: string;
  description: string;
  onViewChange: () => void;
  modoVisualizacao: "lista" | "grade";
  onDownload: () => void;
  onUpload: (cardType: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  onViewChange,
  modoVisualizacao,
  onDownload,
  onUpload
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const registrationLink = "https://example.com/register";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationLink);
    setCopied(true);
    
    toast({
      title: "Link copiado!",
      description: "Link copiado para a área de transferência"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Employee registration link section */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-800 mb-1">
              LINK PARA PREENCHIMENTO INDIVIDUAL DO FUNCIONÁRIO
            </p>
            <div className="bg-white rounded border border-blue-100 p-2 text-sm text-blue-700 overflow-x-auto">
              {registrationLink}
            </div>
          </div>
          <Button 
            variant="outline" 
            className="whitespace-nowrap text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
            onClick={handleCopyLink}
          >
            {copied ? (
              <><Check className="mr-2 h-4 w-4" />Copiado</>
            ) : (
              <><Copy className="mr-2 h-4 w-4" />Copiar Link</>
            )}
          </Button>
        </div>
      </div>
      
      {/* Original header content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <FileText className="mr-2 h-4 w-4" />
            Relatório
          </Button>
          
          <UploadSpreadsheet onUpload={onUpload} />
          
          <Button 
            variant="outline" 
            onClick={onViewChange}
          >
            {modoVisualizacao === "lista" ? (
              <><Eye className="mr-2 h-4 w-4" />Visualização em Grade</>
            ) : (
              <><FileText className="mr-2 h-4 w-4" />Visualização em Lista</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
