
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CropDialogProps } from '@/types/admin';
import { X, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

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
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      // Reset when dialog closes
      setPosition({ x: 0, y: 0 });
      setScale(1);
      setImageLoaded(false);
      setImageQuality(null);
      setImageDimensions({ width: 0, height: 0 });
    }
  }, [open]);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    
    if (imageRef.current) {
      // Store image natural dimensions
      const img = imageRef.current;
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      
      // Analyze image quality
      const minDimension = Math.min(img.naturalWidth, img.naturalHeight);
      // If image is smaller than 500px in either dimension, consider it poor quality
      setImageQuality(minDimension < 500 ? 'poor' : 'good');
      
      // Center the image initially with a slight delay to ensure elements are rendered
      setTimeout(() => {
        if (cropAreaRef.current && containerRef.current) {
          centerImageInCropArea();
        }
      }, 50);
    }
  };

  const centerImageInCropArea = () => {
    if (!imageRef.current || !cropAreaRef.current || !containerRef.current) return;
    
    const img = imageRef.current;
    const cropArea = cropAreaRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    
    // Calculate center position of crop area relative to container
    const cropCenterX = cropArea.left - container.left + cropArea.width / 2;
    const cropCenterY = cropArea.top - container.top + cropArea.height / 2;
    
    // Calculate initial scale to fit the image within the crop area
    // Make sure the initial scale is large enough to fill the crop area
    const widthRatio = cropArea.width / img.naturalWidth;
    const heightRatio = cropArea.height / img.naturalHeight;
    
    // Use a scale that ensures the image fills the crop area
    const initialScale = Math.max(widthRatio, heightRatio) * 1.05; // 105% to ensure it fills
    
    setScale(initialScale);
    
    // Calculate the center position based on scaled dimensions
    const scaledImgWidth = img.naturalWidth * initialScale;
    const scaledImgHeight = img.naturalHeight * initialScale;
    
    // Center the image within the crop area
    const centerX = cropCenterX - scaledImgWidth / 2;
    const centerY = cropCenterY - scaledImgHeight / 2;
    
    setPosition({ x: centerX, y: centerY });
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

  const handleScaleChange = (value: number[]) => {
    setScale(value[0]);
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.1, 3));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.1, 0.5));
  };

  const handleApply = () => {
    if (!imageRef.current || !canvasRef.current || !cropAreaRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cropArea = cropAreaRef.current.getBoundingClientRect();
    const container = containerRef.current?.getBoundingClientRect();
    
    if (!ctx || !container || !imageRef.current) return;
    
    // Set canvas dimensions based on crop area aspect ratio
    canvas.width = 600; // Fixed output width
    canvas.height = Math.round(600 * (CROP_HEIGHT / CROP_WIDTH)); // Maintain aspect ratio
    
    // Calculate the visible portion of the image within the crop area
    const img = imageRef.current;
    const imgRect = img.getBoundingClientRect();
    
    // Calculate the part of the image that is inside the crop area
    // We need to convert from screen coordinates to image coordinates
    const sourceX = (cropArea.left - imgRect.left) / scale;
    const sourceY = (cropArea.top - imgRect.top) / scale;
    const sourceWidth = cropArea.width / scale;
    const sourceHeight = cropArea.height / scale;
    
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden border-0 shadow-xl rounded-lg">
        <div className="p-4 flex justify-between items-center border-b bg-gradient-to-r from-zinc-50 to-slate-100">
          <DialogTitle className="text-xl font-bold text-gray-800">Ajustar Foto</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <DialogDescription className="sr-only">
          Ajuste a posição da foto dentro da área de recorte
        </DialogDescription>
        
        <div 
          ref={containerRef}
          className="relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIxMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTBlMGUwIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2UwZTBlMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')]"
          style={{ height: 'calc(100vh - 250px)', minHeight: '450px', maxHeight: '700px' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Control buttons overlay */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <Button 
              onClick={zoomIn} 
              variant="secondary" 
              size="icon" 
              className="rounded-full h-9 w-9 backdrop-blur-sm bg-white/80 shadow-md"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              onClick={zoomOut} 
              variant="secondary" 
              size="icon" 
              className="rounded-full h-9 w-9 backdrop-blur-sm bg-white/80 shadow-md"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Image to crop with drag functionality */}
          {imageUrl && (
            <div className="overflow-hidden absolute inset-0 flex items-center justify-center">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Imagem para recorte"
                className="absolute"
                style={{ 
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: '0 0',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'none'
                }}
                onLoad={handleImageLoad}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                draggable={false}
              />
            </div>
          )}
          
          {/* Crop area overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] pointer-events-none">
            {/* Transparent crop area */}
            <div 
              ref={cropAreaRef}
              className="absolute border-2 border-blue-500 bg-transparent"
              style={{ 
                left: '50%',
                top: '50%',
                width: '320px', 
                height: `${320 * (CROP_HEIGHT / CROP_WIDTH)}px`,
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
              <div className="absolute -bottom-8 left-0 right-0 text-center bg-white/90 backdrop-blur-sm py-1.5 px-3 rounded-full text-sm font-medium mx-auto w-max">
                {CROP_WIDTH}cm × {CROP_HEIGHT}cm
              </div>
            </div>
          </div>
          
          {/* Image quality indicator */}
          {imageQuality && imageLoaded && (
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${
              imageQuality === 'good' ? 'bg-green-500' : 'bg-yellow-500'
            } text-white text-sm font-medium shadow-md backdrop-blur-sm`}>
              {imageQuality === 'good' ? 'Boa Qualidade' : 'Qualidade Baixa'}
            </div>
          )}
          
          {/* Instructions */}
          {imageLoaded && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center bg-white/90 backdrop-blur-sm py-2 px-4 rounded-full text-sm shadow-md max-w-xs w-full flex items-center justify-center gap-2">
              <Move className="h-4 w-4 text-gray-700" />
              <span>Arraste a imagem para posicionar</span>
            </div>
          )}
        </div>
        
        {/* Zoom controls */}
        {imageLoaded && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-4 max-w-md mx-auto">
              <ZoomOut className="h-4 w-4 text-gray-500" />
              <Slider
                defaultValue={[1]}
                min={0.5}
                max={3}
                step={0.01}
                value={[scale]}
                onValueChange={handleScaleChange}
                className="w-full"
              />
              <ZoomIn className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        <DialogFooter className="p-4 border-t border-gray-100 bg-white flex gap-2 justify-end">
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
