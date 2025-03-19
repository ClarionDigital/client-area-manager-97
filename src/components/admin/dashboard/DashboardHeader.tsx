
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download } from "lucide-react";
import UploadSpreadsheet from "@/components/admin/UploadSpreadsheet";

interface DashboardHeaderProps {
  title: string;
  description: string;
  onViewChange: () => void;
  modoVisualizacao: "lista" | "grade";
  onDownload: () => void;
  onUpload: () => void; // This expects a function with no parameters
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
        
        {/* Create a wrapper function to call the original onUpload with the selected card type */}
        <UploadSpreadsheet 
          onUpload={(cardType: string) => {
            // After the spreadsheet component gets the card type,
            // we call the original onUpload function
            onUpload();
          }} 
        />
        
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
  );
};

export default DashboardHeader;

