
import React, { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clipboard, QrCode, Share2, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface ShareLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matricula: string;
  nome: string;
}

const ShareLinkDialog: React.FC<ShareLinkDialogProps> = ({
  open,
  onOpenChange,
  matricula,
  nome
}) => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("link");
  const baseUrl = window.location.origin;
  const linkWithMatricula = `${baseUrl}/cliente/cartao-individual?matricula=${matricula}`;
  
  // Generate QR code when the dialog is opened and matricula changes
  useEffect(() => {
    if (open && activeTab === "qrcode" && qrCodeRef.current) {
      qrCodeRef.current.innerHTML = '';
      QRCode.toCanvas(
        qrCodeRef.current,
        linkWithMatricula,
        {
          width: 200,
          margin: 2,
          color: {
            dark: '#52aa85',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error("Erro ao gerar QR Code:", error);
        }
      );
    }
  }, [open, matricula, activeTab, linkWithMatricula]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkWithMatricula).then(() => {
      toast({
        title: "Link copiado!",
        description: "Link copiado para área de transferência",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
    }).catch(err => {
      console.error('Erro ao copiar para área de transferência:', err);
      toast({
        title: "Erro ao copiar link",
        description: "Não foi possível copiar o link",
        variant: "destructive",
      });
    });
  };
  
  const shareOnWhatsApp = () => {
    const message = `Olá ${nome.split(' ')[0]}, acesse este link para preencher os dados do seu cartão: ${linkWithMatricula}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    
    const canvas = qrCodeRef.current.querySelector('canvas');
    if (!canvas) return;
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.download = `qrcode-cartao-${matricula}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code baixado",
      description: "QR Code salvo com sucesso",
      className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Link</DialogTitle>
          <DialogDescription>
            Compartilhe o link do cartão com matrícula pré-preenchida para {nome}.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4">
            <div className="flex items-center space-x-2 mt-4">
              <Input 
                readOnly 
                value={linkWithMatricula} 
                className="flex-1"
              />
              <Button onClick={copyToClipboard} size="icon" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Este link já contém a matrícula {matricula} pré-preenchida.
            </p>
          </TabsContent>
          
          <TabsContent value="whatsapp" className="space-y-4">
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <p className="text-sm text-gray-700 mb-2">
                Compartilhar link do cartão via WhatsApp para {nome}:
              </p>
              <Button 
                onClick={shareOnWhatsApp} 
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Compartilhar via WhatsApp
                </div>
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Abrirá o WhatsApp Web ou aplicativo instalado
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="qrcode" className="space-y-4">
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <p className="text-sm text-gray-700 mb-2">
                QR Code para acesso ao cartão com matrícula {matricula}:
              </p>
              <div 
                ref={qrCodeRef} 
                className="flex items-center justify-center bg-white p-2 rounded-lg w-[220px] h-[220px]"
              />
              <Button onClick={downloadQRCode} variant="outline" className="mt-4">
                <Download className="mr-2 h-4 w-4" />
                Baixar QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkDialog;
