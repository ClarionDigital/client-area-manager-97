import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, CreditCard, Check, AlertCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClienteArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matricula, setMatricula] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [foto, setFoto] = useState<File | null>(null);
  
  const handleConsultar = () => {
    if (matricula.trim() === "") {
      toast({
        title: "Erro",
        description: "Por favor insira sua matrícula",
        variant: "destructive",
      });
      return;
    }
    
    // Simulação de login
    const tipoMatricula = matricula.startsWith("3") ? "Light" : matricula.startsWith("7") ? "Conecta" : "Desconhecido";
    
    if (tipoMatricula === "Desconhecido") {
      toast({
        title: "Matrícula inválida",
        description: "Formato de matrícula não reconhecido",
        variant: "destructive",
      });
      return;
    }
    
    setLoggedIn(true);
    toast({
      title: "Consulta realizada",
      description: `Bem-vindo ao sistema. Identificamos sua matrícula como ${tipoMatricula}`,
    });
  };
  
  const dadosCracha = {
    nome: "João da Silva",
    matricula: matricula,
    cargo: "Analista de Sistemas",
    setor: "Tecnologia",
    validade: "31/12/2024",
    tipo: matricula.startsWith("3") ? "Light" : "Conecta"
  };
  
  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleFinalizarCompra = () => {
    toast({
      title: "Compra finalizada!",
      description: "Você receberá um e-mail e WhatsApp com a confirmação",
    });
    // Aqui seria integrado com a API de pagamento ASAAS
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  
  // Renderiza o formulário de login se não estiver logado
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            {/* Logo superior */}
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-16 mb-8"
            />
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left w-full">Matrícula Light</h2>
            
            <div className="w-full mb-4">
              <Input 
                placeholder="Digite sua matrícula" 
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full h-12 text-base"
              />
            </div>
            
            <Button 
              onClick={handleConsultar} 
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 mb-6"
            >
              <Search className="h-5 w-5" />
              Consultar Matrícula
            </Button>
            
            <div className="bg-gray-100 p-4 rounded-md text-gray-700 text-sm mb-8 w-full">
              <p>
                Sistema de solicitação de 2ª via do Kit de Identificação Pessoal Light. Preencha corretamente o número da sua matrícula, e o sistema gerará o seu último crachá com o mesmo modelo atualizado.
              </p>
            </div>
            
            {/* Logo inferior */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
              alt="Light" 
              className="h-12"
            />
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Área do Cliente {dadosCracha.tipo}</CardTitle>
            <CardDescription>
              Solicite sua segunda via de crachá em poucos passos
            </CardDescription>
            
            <div className="flex justify-between items-center mt-6 border-t border-b py-4">
              <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? "bg-blue-100" : "bg-gray-100"}`}>
                  {currentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="text-xs">Dados</span>
              </div>
              
              <div className={`flex-1 h-0.5 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              
              <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? "bg-blue-100" : "bg-gray-100"}`}>
                  {currentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <span className="text-xs">Foto</span>
              </div>
              
              <div className={`flex-1 h-0.5 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              
              <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? "bg-blue-100" : "bg-gray-100"}`}>
                  {currentStep > 3 ? <Check className="h-5 w-5" /> : "3"}
                </div>
                <span className="text-xs">Confirmação</span>
              </div>
              
              <div className={`flex-1 h-0.5 ${currentStep >= 4 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              
              <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 4 ? "bg-blue-100" : "bg-gray-100"}`}>
                  {currentStep > 4 ? <Check className="h-5 w-5" /> : "4"}
                </div>
                <span className="text-xs">Pagamento</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input id="nome" value={dadosCracha.nome} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input id="matricula" value={dadosCracha.matricula} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" value={dadosCracha.cargo} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setor">Setor</Label>
                    <Input id="setor" value={dadosCracha.setor} readOnly />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={nextStep}>Prosseguir</Button>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Envio de Foto</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {foto ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(foto)} 
                        alt="Preview" 
                        className="max-h-48 mb-4 relative"
                        style={{
                          position: "relative"
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-white opacity-30 rotate-45">AGUARDANDO PAGAMENTO</div>
                      </div>
                      <Button variant="outline" onClick={() => setFoto(null)}>
                        Remover Foto
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium mb-2">Arraste sua foto ou clique para fazer upload</h4>
                      <p className="text-sm text-gray-500 mb-4">Formato 3x4, fundo branco</p>
                      <Input
                        id="foto"
                        type="file"
                        accept="image/*"
                        onChange={handleUploadFoto}
                        className="hidden"
                      />
                      <Label htmlFor="foto" className="cursor-pointer">
                        <Button variant="outline">Selecionar Arquivo</Button>
                      </Label>
                    </div>
                  )}
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    A foto será aplicada ao crachá apenas após a confirmação do pagamento. 
                    A imagem deve seguir o padrão 3x4 com fundo branco.
                  </p>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>Voltar</Button>
                  <Button onClick={nextStep} disabled={!foto}>Prosseguir</Button>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Confirmação de Produto</h3>
                
                <Tabs defaultValue="basic">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Crachá Básico</TabsTrigger>
                    <TabsTrigger value="kit">Kit Completo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="p-4 border rounded-md mt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Crachá Segunda Via</h4>
                        <p className="text-sm text-gray-500">Cartão PVC + Cordão Simples</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg">R$ 35,00</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="kit" className="p-4 border rounded-md mt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Kit Completo (+1)</h4>
                        <p className="text-sm text-gray-500">Cartão PVC + Cordão Retrátil + Capa Protetora</p>
                        <p className="text-xs text-emerald-600 font-medium mt-1">Economize R$ 5,00</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm line-through text-gray-400">R$ 50,00</span>
                        <span className="font-bold text-lg block">R$ 45,00</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>Voltar</Button>
                  <Button onClick={nextStep}>Prosseguir para Pagamento</Button>
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Finalização e Pagamento</h3>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-4">Resumo do Pedido</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Produto:</span>
                      <span>Crachá Segunda Via</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nome:</span>
                      <span>{dadosCracha.nome}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Matrícula:</span>
                      <span>{dadosCracha.matricula}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total:</span>
                      <span>R$ 35,00</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Formas de Pagamento</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Cartão de Crédito
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Pix
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>Voltar</Button>
                  <Button onClick={handleFinalizarCompra}>Finalizar Compra</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClienteArea;
