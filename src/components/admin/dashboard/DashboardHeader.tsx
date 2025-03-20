
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Link as LinkIcon } from "lucide-react";
import UploadSpreadsheet from "@/components/admin/UploadSpreadsheet";

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
  return (
    <div className="space-y-4">
      {/* Employee registration link section */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm font-medium text-blue-800">
            LINK PARA PREENCHIMENTO INDIVIDUAL DO FUNCIONÁRIO
          </p>
          <Button 
            variant="outline" 
            className="text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
            onClick={() => {
              // Copy link to clipboard
              navigator.clipboard.writeText("https://example.com/register");
              // You might want to show a toast notification here
            }}
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            LINK AQUI
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
