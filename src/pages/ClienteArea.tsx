
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, CreditCard, Check, AlertCircle, Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClienteArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matricula, setMatricula] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [foto, setFoto] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const handleConsultar = () => {
    if (matricula.trim() === "") {
      toast({
        title: "Erro",
        description: "Por favor insira sua matrícula",
        variant: "destructive",
      });
      return;
    }
    
    // Aceitar qualquer matrícula
    toast({
      title: "Matrícula válida",
      description: "Sua matrícula foi validada com sucesso",
      variant: "default",
    });
    
    setLoggedIn(true);
  };
  
  const dadosCracha = {
    nome: "João da Silva",
    matricula: matricula,
    cargo: "Analista de Sistemas",
    setor: "Tecnologia",
    validade: "31/12/2024",
    tipo: "Light"
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
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const valorUnitario = 66.40;
  const valorTotal = valorUnitario * quantity;
  
  const handleFinalizarCompra = () => {
    toast({
      title: "Compra finalizada!",
      description: "Você receberá um e-mail e WhatsApp com a confirmação",
    });
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
      
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna da esquerda - Pré-visualização */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Pré-Visualização</CardTitle>
              <CardDescription>
                Este é o pré-visualização do crachá. O produto final terá excelente qualidade.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="border-4 border-orange-500 bg-teal-500 p-1 w-64 h-80 flex flex-col items-center">
                <div className="w-full h-full flex flex-col items-center justify-center bg-teal-500 text-white">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
                    alt="Light" 
                    className="h-24 mb-6"
                  />
                  <span className="text-xl">Light</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Coluna da direita - Dados e finalização */}
          <div className="space-y-6">
            {/* Dados do cartão */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cartão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
                      alt="Light Padrão" 
                      className="h-10 mx-auto mb-2"
                    />
                    <span className="text-sm">Light Padrão</span>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
                      alt="Light Conecta" 
                      className="h-10 mx-auto mb-2"
                    />
                    <span className="text-sm">Light Conecta</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input value={dadosCracha.nome} readOnly />
                </div>
                
                <div className="space-y-2">
                  <Label>Matrícula</Label>
                  <Input value={matricula} readOnly />
                </div>
                
                <div className="space-y-2">
                  <Label>Foto</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Label htmlFor="foto-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Clique para selecionar</span>
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
                
                <Button variant="outline" className="w-full bg-teal-600 text-white hover:bg-teal-700">
                  Salvar Cartão
                </Button>
              </CardContent>
            </Card>
            
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="seu@email.com" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
              </CardContent>
            </Card>
            
            {/* Finalização */}
            <Card>
              <CardHeader>
                <CardTitle>Finalização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Selecione o Cordão:</h3>
                    <div className="border border-teal-500 rounded-md p-3 flex items-center justify-between text-teal-700 bg-teal-50">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Cordão Light Verde</span>
                      </div>
                      <span className="font-medium">R$ 15,00</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Selecione o Porta Crachá:</h3>
                    <div className="border border-teal-500 rounded-md p-3 flex items-center justify-between text-teal-700 my-2 bg-teal-50">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Porta Crachá Padrão Cristal</span>
                      </div>
                      <span className="font-medium">R$ 8,50</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                  <h3 className="font-semibold text-lg mb-3">Resumo do Pedido:</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex justify-between">
                      <span>• Crachá - Kit Completo</span>
                      <span>R$ 42,90</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• Cordão Light Verde</span>
                      <span>R$ 15,00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• Porta Crachá</span>
                      <span>R$ 8,50</span>
                    </li>
                  </ul>
                  
                  <div className="flex justify-between items-center border-t border-blue-200 pt-3 font-bold text-lg text-blue-800">
                    <span>Total:</span>
                    <span>R$ 66,40</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Quantidade:</span>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={decreaseQuantity}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4 font-medium">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={increaseQuantity}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-sm text-amber-800 mb-4">
                      <p>
                        <strong>KIT COMPLETO</strong><br />
                        CRACHÁ + CORDÃO + PORTA CRACHÁ R$: 66,40 PODENDO ADICIONAR MAIS QUANTIDADES DE COPIA
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  <strong>Informações de entrega:</strong><br />
                  A entrega será realizada em até 10 dias úteis após a confirmação do pagamento. Para mais informações, entre em contato pelo e-mail ou telefone.
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  size="lg"
                  onClick={handleFinalizarCompra}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Finalizar Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteArea;
