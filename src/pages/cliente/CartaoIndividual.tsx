
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import CardForm from "@/components/cliente/CardForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Check, AlertCircle } from "lucide-react";
import { createIndividualCardEntry } from "@/utils/cardHelpers";

const CartaoIndividual = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [matricula, setMatricula] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [funcionarioDados, setFuncionarioDados] = useState<{
    matricula: string;
  } | null>(null);

  // Parse matricula from URL query parameter
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const matriculaParam = params.get("matricula");
    if (matriculaParam) {
      setMatricula(matriculaParam);
      handleSearch(matriculaParam);
    }
  }, [location]);

  const isValidMatricula = (mat: string): boolean => {
    // Validate that matricula starts with 3 or 7 and has a minimum length
    return (mat.startsWith('3') || mat.startsWith('7')) && mat.length >= 5;
  };

  const handleSearch = (mat?: string) => {
    setLoading(true);
    
    // In a real implementation, this would be an API call to fetch employee data
    // For demo purposes, we'll simulate a delay and return mock data
    setTimeout(() => {
      const searchMatricula = mat || matricula;
      
      if (isValidMatricula(searchMatricula)) {
        // Just validate matricula format and create a basic record
        setFuncionarioDados({
          matricula: searchMatricula
        });
        
        setFound(true);
      } else {
        toast({
          title: "Erro",
          description: "Matrícula inválida. A matrícula deve começar com 3 ou 7.",
          variant: "destructive",
        });
        setFound(false);
        setFuncionarioDados(null);
      }
      
      setLoading(false);
    }, 800);
  };

  const handleCardSaved = (cardData: {
    nomeAbreviado: string;
    nomeCompleto: string;
    foto: File | null;
    fotoUrl: string | null;
    previewUrl: string;
  }) => {
    // In a real implementation, this would submit the data to the backend
    setLoading(true);
    
    setTimeout(() => {
      // Create a new entry for the card - in a real app, this would be sent to a server
      if (funcionarioDados) {
        const isTipoLight = funcionarioDados.matricula.startsWith("3");
        
        // Using helper function to format data
        const newEntry = createIndividualCardEntry({
          nome: cardData.nomeCompleto,
          nomeAbreviado: cardData.nomeAbreviado,
          matricula: funcionarioDados.matricula,
          tipo: isTipoLight ? "Light" : "Conecta",
          foto: cardData.foto !== null
        });
        
        // In a production app, we would dispatch this to the backend
        console.log("Card data submitted:", newEntry);
      }
      
      setLoading(false);
      setSubmitted(true);
      
      toast({
        title: "Sucesso",
        description: "Pedido enviado com sucesso!",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:py-8">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-0">
          <div className="p-4 md:p-6 flex flex-col items-center">
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-12 md:h-16 mb-6"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
            
            {submitted ? (
              <div className="text-center p-8 my-12">
                <div className="w-16 h-16 bg-[#8cdcd8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Pedido Enviado com Sucesso!</h2>
                <p className="text-gray-600 mb-6">
                  Seu pedido de cartão foi enviado para validação e produção. Em breve você receberá mais informações.
                </p>
                <Button 
                  className="bg-[#8cdcd8] hover:bg-[#7cc9c5] text-white"
                  onClick={() => {
                    setSubmitted(false);
                    setFound(false);
                    setFuncionarioDados(null);
                    setMatricula("");
                  }}
                >
                  Preencher outro cartão
                </Button>
              </div>
            ) : found && funcionarioDados ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">
                  Preenchimento Individual de Cartão
                </h2>
                
                <CardForm 
                  matricula={funcionarioDados.matricula}
                  onCardSaved={handleCardSaved}
                  saveButtonText="Enviar Pedido"
                />
                
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
                  alt="Light" 
                  className="h-12 mt-8"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </>
            ) : (
              <div className="w-full max-w-md p-6 my-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Preenchimento Individual de Cartão
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Número de Matrícula</Label>
                    <div className="flex gap-2">
                      <Input
                        id="matricula"
                        placeholder="Digite sua matrícula (começa com 3 ou 7)"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        className={`shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all ${matricula && !isValidMatricula(matricula) ? 'border-red-500' : ''}`}
                      />
                      <Button 
                        onClick={() => handleSearch()}
                        disabled={loading || !isValidMatricula(matricula)}
                        className="bg-[#8cdcd8] hover:bg-[#7cc9c5] text-white"
                      >
                        {loading ? (
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Search className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {matricula && !isValidMatricula(matricula) ? (
                      <div className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>A matrícula deve começar com 3 ou 7</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">
                        Digite sua matrícula para preencher os dados do seu cartão
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartaoIndividual;
