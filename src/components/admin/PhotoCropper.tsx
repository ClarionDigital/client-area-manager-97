
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CropDialogProps } from '@/types/admin';
import { X } from 'lucide-react';

// Dimensions in cm - exported for use in other components
export const CROP_WIDTH = 5.9; // cm
export const CROP_HEIGHT = 3.59; // cm

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [imageQuality, setImageQuality] = useState<'good' | 'poor' | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      // Reset when dialog closes
      setPosition({ x: 0, y: 0 });
      setScale(1);
      setImageLoaded(false);
      setImageQuality(null);
    }
  }, [open]);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    
    if (imageRef.current) {
      // Analyze image quality
      const img = imageRef.current;
      const minDimension = Math.min(img.naturalWidth, img.naturalHeight);
      // If image is smaller than 500px in either dimension, consider it poor quality
      setImageQuality(minDimension < 500 ? 'poor' : 'good');
      
      // Center the image initially
      if (cropAreaRef.current && img) {
        const cropArea = cropAreaRef.current.getBoundingClientRect();
        const cropWidth = cropArea.width;
        const cropHeight = cropArea.height;
        
        // Calculate initial scale to fit image inside crop area while maintaining aspect ratio
        const widthRatio = cropWidth / img.naturalWidth;
        const heightRatio = cropHeight / img.naturalHeight;
        const initialScale = Math.min(widthRatio, heightRatio) * 0.95; // 95% to leave some margin
        
        setScale(initialScale);
        
        // Center the image
        const scaledImgWidth = img.naturalWidth * initialScale;
        const scaledImgHeight = img.naturalHeight * initialScale;
        const centerX = (cropWidth - scaledImgWidth) / 2;
        const centerY = (cropHeight - scaledImgHeight) / 2;
        
        setPosition({ x: centerX, y: centerY });
      }
    }
  };

  // Mouse and touch event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleApply = () => {
    if (!imageRef.current || !canvasRef.current || !cropAreaRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cropArea = cropAreaRef.current.getBoundingClientRect();
    
    if (ctx && imageRef.current) {
      // Set canvas dimensions based on crop area
      canvas.width = 600; // Fixed output width
      canvas.height = 600 * (CROP_HEIGHT / CROP_WIDTH); // Maintain aspect ratio
      
      // Calculate the visible portion of the image within the crop area
      const img = imageRef.current;
      const cropRect = cropAreaRef.current.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      
      // Calculate the part of the image that is inside the crop area
      const sourceX = (cropRect.left - imgRect.left) / scale;
      const sourceY = (cropRect.top - imgRect.top) / scale;
      const sourceWidth = cropRect.width / scale;
      const sourceHeight = cropRect.height / scale;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw only the portion of the image that is inside the crop area
      ctx.drawImage(
        img,
        Math.max(0, sourceX), Math.max(0, sourceY), // Make sure we don't go outside the image
        sourceWidth, sourceHeight,
        0, 0, 
        canvas.width, canvas.height
      );
      
      // Convert to data URL and complete the crop
      const croppedUrl = canvas.toDataURL('image/jpeg', 0.95);
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
        
        <div 
          className="relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIxMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTBlMGUwIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2UwZTBlMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')]"
          style={{ height: '500px' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image to crop with drag functionality */}
          {imageUrl && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Imagem para recorte"
              className="absolute"
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: '0 0',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onLoad={handleImageLoad}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              draggable={false}
            />
          )}
          
          {/* Crop area overlay */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none">
            {/* Transparent crop area */}
            <div 
              ref={cropAreaRef}
              className="absolute border-2 border-blue-500 bg-transparent"
              style={{ 
                left: '50%',
                top: '50%',
                width: '400px', 
                height: `${400 * (CROP_HEIGHT / CROP_WIDTH)}px`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
              
              {/* Dimension indicator */}
              <div className="absolute -bottom-8 left-0 right-0 text-center bg-white/80 backdrop-blur-sm py-1 px-2 rounded text-sm">
                {CROP_WIDTH}cm × {CROP_HEIGHT}cm
              </div>
            </div>
          </div>
          
          {/* Image quality indicator */}
          {imageQuality && imageLoaded && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded ${
              imageQuality === 'good' ? 'bg-green-500' : 'bg-yellow-500'
            } text-white text-sm font-medium`}>
              {imageQuality === 'good' ? 'Boa Qualidade' : 'Qualidade Baixa'}
            </div>
          )}
          
          {/* Instructions */}
          {imageLoaded && (
            <div className="absolute bottom-4 left-4 right-4 text-center bg-white/80 backdrop-blur-sm py-2 px-3 rounded text-sm">
              Arraste a imagem para posicionar | Ajuste a posição do rosto dentro da área demarcada
            </div>
          )}
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
            disabled={!imageLoaded}
          >
            Aplicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoCropper;
