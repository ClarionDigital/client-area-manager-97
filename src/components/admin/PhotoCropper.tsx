
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CropDialogProps } from '@/types/admin';
import { X } from 'lucide-react';

const CROP_WIDTH = 5.5; // cm
const CROP_HEIGHT = 5.2; // cm

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
      setZoomLevel(1);
      setCropPosition({ x: 0, y: 0 });
    }
  }, [open]);

  const handleMove = (dx: number, dy: number) => {
    setCropPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  const handleZoom = (increment: number) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + increment)));
  };

  const handleApply = () => {
    if (!imageRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx && imageRef.current) {
      // Set canvas dimensions for ID photo
      canvas.width = 300;
      canvas.height = 300;
      
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
      const croppedUrl = canvas.toDataURL('image/jpeg');
      onCropComplete(croppedUrl);
      onOpenChange(false);
    }
  };

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
              <div className="relative" style={{ width: '300px' }}>
                {/* Background image with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-800 opacity-50"></div>
                
                {/* ID Card */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className={`flex flex-col ${cardType === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'} text-white rounded-md overflow-hidden mx-auto`} style={{ width: '200px' }}>
                    <img 
                      src={cardType === 'Light' ? '/placeholder.svg' : '/placeholder.svg'} 
                      alt="Logo"
                      className="h-6 object-contain mx-auto my-1"
                    />
                    <div className="flex p-2 bg-white text-black">
                      <div className="w-16 h-20 bg-gray-200 border border-gray-300 overflow-hidden rounded-sm mr-2"></div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold truncate">{employeeName || "Nome do Funcionário"}</div>
                        <div>{employeeRole || "Cargo"}</div>
                        <div>Mat: {employeeId || "0000000"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Frame overlay - dashed border */}
                <div className="absolute inset-0 border-2 border-dashed border-white/80 flex flex-col justify-between p-4">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-t-2 border-l-2 border-white/80"></div>
                    <div className="w-8 h-8 border-t-2 border-r-2 border-white/80"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-b-2 border-l-2 border-white/80"></div>
                    <div className="w-8 h-8 border-b-2 border-r-2 border-white/80"></div>
                  </div>
                </div>
                
                {/* Label with dimensions */}
                <div className="absolute -bottom-6 left-0 right-0 text-center text-xs bg-white py-1 rounded shadow">
                  {CROP_WIDTH}cm × {CROP_HEIGHT}cm
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => handleZoom(-0.1)}
              >-</Button>
              <div className="w-24 text-center text-sm">Zoom: {Math.round(zoomLevel * 100)}%</div>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => handleZoom(0.1)}
              >+</Button>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg flex items-center">
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => handleMove(-10, 0)}
              >←</Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => handleMove(0, -10)}
              >↑</Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => handleMove(0, 10)}
              >↓</Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => handleMove(10, 0)}
              >→</Button>
            </div>
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        <DialogFooter className="p-4 bg-gray-50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleApply} className="bg-green-600 hover:bg-green-700">
            Aplicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoCropper;
