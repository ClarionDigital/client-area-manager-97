
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useIsMobile, useIsSmallMobile } from '@/hooks/use-mobile';
import { Progress } from "@/components/ui/progress";

interface OrderSubmitButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  progress?: number;
  showProgress?: boolean;
}

const OrderSubmitButton: React.FC<OrderSubmitButtonProps> = ({ 
  onClick, 
  label = "ENVIAR PEDIDO",
  disabled = false,
  progress = 0,
  showProgress = false
}) => {
  const isMobile = useIsMobile();
  const isSmallMobile = useIsSmallMobile();
  
  // Simplify label for very small devices
  const displayLabel = isSmallMobile && label.length > 8 
    ? "ENVIAR" 
    : (isMobile && label.length > 10 ? label.split(' ')[0] : label);
  
  return (
    <div className="flex flex-col items-center mt-8 w-full">
      {showProgress && (
        <div className="w-full max-w-md mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>
      )}
      
      <Button 
        variant="orange" 
        size={isMobile ? "default" : "lg"} 
        onClick={onClick}
        disabled={disabled}
        className={`px-4 md:px-8 w-full max-w-xs md:max-w-md ${showProgress ? 'mt-2' : ''}`}
      >
        <Send className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
        {displayLabel}
      </Button>
    </div>
  );
};

export default OrderSubmitButton;
