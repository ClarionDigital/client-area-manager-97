
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Save, CreditCard, User, BadgeCheck, Camera, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardFormProps {
  matricula: string;
  nomeAbreviadoInicial?: string;
  nomeCompletoInicial?: string;
  onCardSaved: (cardData: {
    nomeAbreviado: string;
    nomeCompleto: string;
    foto: File | null;
    fotoUrl: string | null;
    previewUrl: string;
  }) => void;
}

const CardForm: React.FC<CardFormProps> = ({ 
  matricula, 
  nomeAbreviadoInicial = "", 
  nomeCompletoInicial = "", 
  onCardSaved 
}) => {
  const { toast } = useToast();
  const [nomeAbreviado, setNomeAbreviado] = useState(nomeAbreviadoInicial);
  const [nomeCompleto, setNomeCompleto] = useState(nomeCompletoInicial);
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // URL fixa para o modelo do cartão
  const previewUrl = "https://crachasrj.com/autismo/modelo-light-verde.php?first_name=JOAO&full_name=JOAO+SILVA&registration_number=12345&photo=https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao.jpg&id=7";

  useEffect(() => {
    setNomeAbreviado(nomeAbreviadoInicial);
    setNomeCompleto(nomeCompletoInicial);
  }, [nomeAbreviadoInicial, nomeCompletoInicial]);

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      
      const url = URL.createObjectURL(file);
      setFotoUrl(url);
    }
  };
  
  const handleSaveCard = async () => {
    if (!nomeAbreviado.trim()) {
      toast({
        title: "Erro",
        description: "Por favor preencha o Nome Abreviado",
        variant: "destructive",
      });
      return;
    }

    if (!nomeCompleto.trim()) {
      toast({
        title: "Erro",
        description: "Por favor preencha o Nome Completo",
        variant: "destructive",
      });
      return;
    }

    if (!foto) {
      toast({
        title: "Erro",
        description: "Por favor adicione uma foto",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Aqui será implementada a lógica para enviar os dados ao banco de dados
      // Por enquanto, apenas simularemos um atraso para mostrar o processo
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Sucesso",
        description: "Dados do cartão salvos com sucesso",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
      
      onCardSaved({
        nomeAbreviado,
        nomeCompleto,
        foto,
        fotoUrl,
        previewUrl
      });
    } catch (error) {
      console.error("Erro ao salvar cartão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar os dados do cartão",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="flex flex-col md:col-span-1 overflow-hidden">
        <div className="w-full p-4 bg-[#8cdcd8]/20 border-b border-[#8cdcd8]/30">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="h-5 w-5 text-[#52aa85]" />
            <h3 className="text-lg font-semibold text-gray-800">Pré-Visualização</h3>
          </div>
          <p className="text-sm text-gray-600">Esta é uma pré-visualização digital ilustrativa de como ficará o seu cartão.</p>
        </div>
        <div className="p-4 h-full flex items-center justify-center">
          <img 
            src={previewUrl} 
            alt="Modelo do Cartão" 
            className="w-full h-auto object-contain shadow-lg rounded-xl"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <Type className="h-4 w-4 text-[#52aa85]" />
              Nome Abreviado
            </Label>
            <Input 
              placeholder="Digite seu nome abreviado" 
              value={nomeAbreviado} 
              onChange={(e) => setNomeAbreviado(e.target.value)}
              className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all"
              readOnly={!!nomeAbreviadoInicial}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-[#52aa85]" />
              Nome Completo
            </Label>
            <Input 
              placeholder="Digite seu nome completo" 
              value={nomeCompleto} 
              onChange={(e) => setNomeCompleto(e.target.value)}
              className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all"
              readOnly={!!nomeCompletoInicial}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#52aa85]" />
              Matrícula
            </Label>
            <Input 
              value={matricula} 
              readOnly 
              className="bg-gray-50 shadow-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <Camera className="h-4 w-4 text-[#52aa85]" />
              Foto
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors hover:bg-gray-50">
              <Label htmlFor="foto-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-[#8cdcd8] mb-2" />
                  <span className="text-sm text-gray-500">Clique para selecionar</span>
                  {foto && <span className="text-xs text-green-600 mt-2">Foto selecionada: {foto.name}</span>}
                </div>
                <Input
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFoto}
                  className="hidden"
                />
              </Label>
            </div>
          </div>

          <Button 
            onClick={handleSaveCard} 
            className="w-full h-12 bg-[#8cdcd8] hover:bg-[#7cc9c5] text-white shadow-md transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Salvar Cartão
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
