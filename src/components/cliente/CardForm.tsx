import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Save, CreditCard, User, BadgeCheck, Camera, Type, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

interface CardFormProps {
  matricula: string;
  nomeAbreviadoInicial?: string;
  nomeCompletoInicial?: string;
  fotoUrlInicial?: string | null;
  previewUrlInicial?: string;
  saveButtonText?: string;
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
  fotoUrlInicial = null,
  previewUrlInicial = "",
  saveButtonText = "Salvar Cartão",
  onCardSaved 
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [nomeAbreviado, setNomeAbreviado] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [nomeCompletoError, setNomeCompletoError] = useState(false);
  
  const MAX_NOME_COMPLETO_LENGTH = 27;

  useEffect(() => {
    if (nomeAbreviadoInicial) setNomeAbreviado(nomeAbreviadoInicial);
    if (nomeCompletoInicial) {
      setNomeCompleto(nomeCompletoInicial);
      if (nomeCompletoInicial.length > MAX_NOME_COMPLETO_LENGTH) {
        setNomeCompletoError(true);
      }
    }
    if (fotoUrlInicial) setFotoUrl(fotoUrlInicial);
    
    updatePreviewUrl(
      nomeAbreviadoInicial || "", 
      nomeCompletoInicial || "", 
      matricula, 
      fotoUrlInicial || null
    );
  }, [matricula, nomeAbreviadoInicial, nomeCompletoInicial, fotoUrlInicial]);

  const isValidMatricula = (mat: string) => {
    return mat.startsWith('3') || mat.startsWith('7');
  };

  const updatePreviewUrl = (nome: string, nomeCompleto: string, matricula: string, fotoUrl: string | null) => {
    setIsPreviewLoading(true);
    const cardId = matricula.startsWith("3") ? "3" : "7";
    
    const displayNome = nome.trim() ? nome : "NOME";
    const displayNomeCompleto = nomeCompleto.trim() ? nomeCompleto : "NOME COMPLETO";
    const displayMatricula = matricula.trim() ? matricula : "00000000";
    
    const url = `https://areadocliente.alternativacard.com/up/card-light.php?nome=${encodeURIComponent(displayNome)}&nome_completo=${encodeURIComponent(displayNomeCompleto)}&matricula=${encodeURIComponent(displayMatricula)}&foto=${fotoUrl ? encodeURIComponent(fotoUrl) : ""}&id=${cardId}&keep_case=true&no_resize=true`;
    
    setPreviewUrl(url);
  };

  const handlePreviewLoad = () => {
    setIsPreviewLoading(false);
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      
      const url = URL.createObjectURL(file);
      setFotoUrl(url);
      
      updatePreviewUrl(nomeAbreviado, nomeCompleto, matricula, url);
    }
  };
  
  const handleNomeCompletoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNomeCompleto(value);
    
    if (value.length > MAX_NOME_COMPLETO_LENGTH) {
      setNomeCompletoError(true);
    } else {
      setNomeCompletoError(false);
    }
    
    updatePreviewUrl(nomeAbreviado, value, matricula, fotoUrl);
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
    
    if (nomeCompletoError) {
      toast({
        title: "Erro",
        description: `O nome completo deve ter no máximo ${MAX_NOME_COMPLETO_LENGTH} caracteres. Por favor, abrevie o nome.`,
        variant: "destructive",
      });
      return;
    }

    if (!fotoUrl) {
      toast({
        title: "Erro",
        description: "Por favor adicione uma foto",
        variant: "destructive",
      });
      return;
    }

    if (!isValidMatricula(matricula)) {
      toast({
        title: "Erro",
        description: "A matrícula deve começar com 3 ou 7",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Sucesso",
        description: "Dados do cartão salvos com sucesso",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]/30",
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
          <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ 
            width: '292px',
            height: '451px',
            margin: '0 auto'
          }}>
            {isPreviewLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="h-8 w-8 border-4 border-[#8cdcd8] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/660bcf94-ee64-437d-adf6-c3f765a5016a.png"
                alt="Card template"
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
              />
            </div>
            <iframe 
              src={previewUrl} 
              className="absolute inset-0 w-full h-full border-0"
              style={{
                border: 'none',
                overflow: 'hidden',
                width: '100%',
                height: '100%'
              }}
              onLoad={handlePreviewLoad}
              frameBorder="0"
              scrolling="no"
              title="Previsualização do Cartão"
            />
          </div>
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
              onChange={(e) => {
                setNomeAbreviado(e.target.value);
                updatePreviewUrl(e.target.value, nomeCompleto, matricula, fotoUrl);
              }}
              className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all"
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
              onChange={handleNomeCompletoChange}
              className={`shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all ${nomeCompletoError ? 'border-red-500 focus:ring-red-200' : ''}`}
            />
            {nomeCompletoError && (
              <div className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>O nome completo deve ter no máximo {MAX_NOME_COMPLETO_LENGTH} caracteres. Por favor, abrevie o nome.</span>
              </div>
            )}
            <div className="flex justify-end">
              <span className={`text-xs ${nomeCompletoError ? 'text-red-500' : 'text-gray-500'}`}>
                {nomeCompleto.length}/{MAX_NOME_COMPLETO_LENGTH} caracteres
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#52aa85]" />
              Matrícula
            </Label>
            <Input 
              value={matricula} 
              readOnly 
              className={`bg-gray-50 shadow-sm ${!isValidMatricula(matricula) ? 'border-red-500' : ''}`}
            />
            {!isValidMatricula(matricula) && (
              <p className="text-sm text-red-500">A matrícula deve começar com 3 ou 7</p>
            )}
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
                  <span className="text-sm text-gray-500">Clique para {fotoUrl ? 'modificar' : 'selecionar'}</span>
                  {foto && <span className="text-xs text-green-600 mt-2">Nova foto selecionada: {foto.name}</span>}
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
            disabled={isSubmitting || !isValidMatricula(matricula) || nomeCompletoError}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </div>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {saveButtonText}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
