
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CropDialogProps } from '@/types/admin';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';

// New dimensions in cm
const CROP_WIDTH = 5.9; // cm
const CROP_HEIGHT = 3.59; // cm

const PhotoCropper: React.FC<CropDialogProps> = ({
  open,
  onOpenChange,
  onCropComplete,
  imageUrl,
  cardType,
  employeeName,
  employeeId,
  employeeRole
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      // Reset when dialog closes
      setZoomLevel(0.6); // Start with 60% zoom as shown in the example
      setCropPosition({ x: 0, y: 0 });
    } else {
      setZoomLevel(0.6); // Set initial zoom to 60%
    }
  }, [open]);

  const handleMove = (dx: number, dy: number) => {
    setCropPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  const handleZoom = (increment: number) => {
    setZoomLevel(prev => Math.max(0.2, Math.min(2, prev + increment)));
  };

  const handleApply = () => {
    if (!imageRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx && imageRef.current) {
      // Set canvas dimensions for ID photo
      canvas.width = 300;
      canvas.height = 300 * (CROP_HEIGHT / CROP_WIDTH); // Maintain aspect ratio
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scaled dimensions
      const image = imageRef.current;
      const aspectRatio = image.naturalWidth / image.naturalHeight;
      const scaledWidth = image.height * aspectRatio * zoomLevel;
      const scaledHeight = image.height * zoomLevel;
      
      // Draw the image with crop and zoom applied
      ctx.drawImage(
        image,
        cropPosition.x, cropPosition.y,
        scaledWidth / zoomLevel, scaledHeight / zoomLevel,
        0, 0,
        canvas.width, canvas.height
      );
      
      // Convert to data URL and set as cropped image
      const croppedUrl = canvas.toDataURL('image/jpeg', 0.95);
      onCropComplete(croppedUrl);
      onOpenChange(false);
    }
  };

  // Helper function to format zoom level as percentage
  const getZoomPercentage = () => `${Math.round(zoomLevel * 100)}%`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Ajustar Foto</h2>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative bg-neutral-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIxMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTBlMGUwIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2UwZTBlMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')]">
          <div 
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{ minHeight: '500px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {imageUrl && (
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Imagem para recorte"
                  style={{ 
                    transform: `translate(-${cropPosition.x}px, -${cropPosition.y}px) scale(${zoomLevel})`,
                    transformOrigin: 'center',
                    maxWidth: 'none'
                  }}
                  className="pointer-events-none"
                />
              )}
            </div>
            
            {/* ID Card overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                {/* Background overlay with semi-transparency */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Crop frame */}
                <div 
                  className="relative border-2 border-white overflow-hidden bg-transparent"
                  style={{ 
                    width: '400px', 
                    height: `${400 * (CROP_HEIGHT / CROP_WIDTH)}px`,
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* ID Card preview */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className={`flex flex-col ${cardType === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'} text-white mx-auto`} style={{ width: '200px' }}>
                      <div className="flex p-2 bg-white text-black">
                        <div className="w-16 h-20 bg-transparent border border-gray-300 overflow-hidden rounded-sm mr-2"></div>
                        <div className="flex-1 text-xs">
                          <div className="font-bold truncate">{employeeName || "Nome do Funcionário"}</div>
                          <div>{employeeRole || "Cargo"}</div>
                          <div>Mat: {employeeId || "0000000"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashed border frame */}
                  <div className="absolute inset-0 border border-dashed border-white/80">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-t border-l border-white/80"></div>
                      <div className="w-8 h-8 border-t border-r border-white/80"></div>
                    </div>
                    <div className="flex justify-between h-full items-end">
                      <div className="w-8 h-8 border-b border-l border-white/80"></div>
                      <div className="w-8 h-8 border-b border-r border-white/80"></div>
                    </div>
                  </div>
                </div>
                
                {/* Dimension label */}
                <div className="absolute -bottom-8 left-0 right-0 text-center bg-white/80 backdrop-blur-sm py-1 px-2 rounded text-sm">
                  {CROP_WIDTH}cm × {CROP_HEIGHT}cm
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls - styled to match the reference image */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center space-x-8 z-10">
            {/* Zoom controls */}
            <div className="bg-white rounded-full px-4 py-1 shadow-md flex items-center gap-1">
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 text-gray-700"
                onClick={() => handleZoom(-0.05)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-24 text-center text-sm font-medium">Zoom: {getZoomPercentage()}</div>
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 text-gray-700"
                onClick={() => handleZoom(0.05)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Direction controls */}
            <div className="bg-white rounded-full py-1 px-3 shadow-md flex items-center gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 text-gray-700"
                onClick={() => handleMove(-10, 0)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 text-gray-700"
                onClick={() => handleMove(0, -10)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 text-gray-700"
                onClick={() => handleMove(0, 10)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0 text-gray-700"
                onClick={() => handleMove(10, 0)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        <DialogFooter className="p-4 bg-gray-50">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-md"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleApply} 
            className="bg-green-600 hover:bg-green-700 rounded-md"
          >
            Aplicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoCropper;
