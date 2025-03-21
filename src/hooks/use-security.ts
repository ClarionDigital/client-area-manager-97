
import { useEffect } from "react";
import { useToast } from "./use-toast";

export const useSecurity = () => {
  const { toast } = useToast();

  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();
    
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) || 
        e.key === 'PrintScreen' || 
        e.key === 'F12'
      ) {
        e.preventDefault();
        toast({
          title: "Ação bloqueada",
          description: "A impressão e captura de tela não são permitidas por motivos de segurança.",
          variant: "destructive",
        });
      }
    };
    
    const preventPrint = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      toast({
        title: "Ação bloqueada",
        description: "A impressão não é permitida por motivos de segurança.",
        variant: "destructive",
      });
      return false;
    };
    
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('keydown', preventKeyboardShortcuts);
    window.addEventListener('beforeprint', preventPrint);
    document.body.style.userSelect = 'none';
    
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
      window.removeEventListener('beforeprint', preventPrint);
      document.body.style.userSelect = '';
    };
  }, [toast]);
};
