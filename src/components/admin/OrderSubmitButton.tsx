
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface OrderSubmitButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const OrderSubmitButton: React.FC<OrderSubmitButtonProps> = ({ 
  onClick, 
  label = "ENVIAR PEDIDO",
  disabled = false 
}) => {
  return (
    <div className="flex justify-center mt-8">
      <Button 
        variant="orange" 
        size="lg" 
        onClick={onClick}
        disabled={disabled}
        className="px-8"
      >
        <Send className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </div>
  );
};

export default OrderSubmitButton;
