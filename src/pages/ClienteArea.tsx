
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, CreditCard, Check, AlertCircle, Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClienteArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matricula, setMatricula] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
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
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto">
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            {/* Logo superior */}
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-16 mb-8"
            />
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados do Cartão</h2>
            
            <div className="w-full space-y-4 mb-6">
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
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados Pessoais</h2>
            
            <div className="w-full space-y-4 mb-6">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input placeholder="Digite seu nome completo" />
              </div>
              
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input placeholder="000.000.000-00" />
              </div>
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="seu@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input placeholder="(00) 00000-0000" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Produtos</h2>
            
            <div className="w-full space-y-4 mb-6">
              <div>
                <div className="font-medium mb-2">Cordão Light Verde</div>
              </div>
              
              <div>
                <div className="font-medium mb-2">Porta Crachá Padrão Cristal</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-blue-800">Total:</span>
                  <span className="font-bold text-lg text-blue-800">R$ {valorTotal.toFixed(2)}</span>
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
                </div>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <strong>Informações de entrega:</strong><br />
                A entrega será realizada em até 10 dias úteis após a confirmação do pagamento. Para mais informações, entre em contato pelo e-mail ou telefone.
              </div>
              
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12" 
                onClick={handleFinalizarCompra}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Finalizar Pedido
              </Button>
            </div>
            
            {/* Logo inferior */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
              alt="Light" 
              className="h-12 mt-4"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClienteArea;
