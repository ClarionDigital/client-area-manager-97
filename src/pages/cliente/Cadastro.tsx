
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CardForm from "@/components/cliente/CardForm";
import PersonalInfoForm from "@/components/cliente/PersonalInfoForm";
import OrderSummary from "@/components/cliente/OrderSummary";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matricula, setMatricula] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cardSaved, setCardSaved] = useState(false);
  const [nomeAbreviado, setNomeAbreviado] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const valorUnitario = 66.40;
  
  // Verificar se o usuário já fez login
  useEffect(() => {
    const storedMatricula = localStorage.getItem("matricula");
    if (!storedMatricula) {
      navigate("/cliente/login");
      return;
    }
    setMatricula(storedMatricula);
  }, [navigate]);
  
  const handleCardSaved = (cardData: {
    nomeAbreviado: string;
    nomeCompleto: string;
    foto: File | null;
    fotoUrl: string | null;
  }) => {
    setNomeAbreviado(cardData.nomeAbreviado);
    setNomeCompleto(cardData.nomeCompleto);
    setFoto(cardData.foto);
    setFotoUrl(cardData.fotoUrl);
    setCardSaved(true);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleFormClick = () => {
    if (!cardSaved) {
      toast({
        title: "Atenção",
        description: "Por favor salve os dados do cartão antes de prosseguir",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
    }
  };
  
  const handleFinalizarCompra = async () => {
    if (!cardSaved) {
      toast({
        title: "Atenção",
        description: "Por favor salve os dados do cartão antes de prosseguir",
        variant: "destructive",
      });
      return;
    }
    
    const formNome = document.getElementById("nome-completo") as HTMLInputElement;
    const formCpf = document.getElementById("cpf") as HTMLInputElement;
    const formEmail = document.getElementById("email") as HTMLInputElement;
    const formTelefone = document.getElementById("telefone") as HTMLInputElement;
    
    if (formNome && !nomeCompleto) setNomeCompleto(formNome.value);
    if (formCpf && !cpf) setCpf(formCpf.value);
    if (formEmail && !email) setEmail(formEmail.value);
    if (formTelefone && !telefone) setTelefone(formTelefone.value);
    
    if (!formNome?.value || !formCpf?.value || !formEmail?.value || !formTelefone?.value) {
      toast({
        title: "Dados incompletos",
        description: "Por favor preencha todos os campos de dados pessoais",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Aqui será implementada a lógica para enviar os dados ao banco de dados
      // Por enquanto, apenas simularemos um atraso para mostrar o processo
      await new Promise(resolve => setTimeout(resolve, 800));

      // Quando tivermos uma integração real com banco de dados:
      // const pedidoData = {
      //   matricula,
      //   nomeAbreviado,
      //   nomeCompleto: formNome.value,
      //   cpf: formCpf.value,
      //   email: formEmail.value,
      //   telefone: formTelefone.value,
      //   quantidade: quantity,
      //   valorUnitario,
      //   valorTotal: quantity * valorUnitario,
      //   status: 'aguardando_pagamento',
      //   dataCriacao: new Date().toISOString(),
      // };
      // const fotoData = new FormData();
      // if (foto) fotoData.append('foto', foto);
      // const response = await fetch('/api/pedidos', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(pedidoData)
      // });
      // if (!response.ok) throw new Error('Falha ao criar pedido');
      // const { id: pedidoId } = await response.json();
      // if (foto) {
      //   fotoData.append('pedidoId', pedidoId);
      //   await fetch('/api/upload/foto', { method: 'POST', body: fotoData });
      // }

      // Salvando os dados no localStorage para uso na página de pagamento (temporário)
      const clienteData = {
        nomeCompleto: formNome.value,
        cpf: formCpf.value,
        email: formEmail.value,
        telefone: formTelefone.value,
        quantity,
        valorUnitario,
        nomeAbreviado,
        // idPedido: 'temporario-' + Date.now(), // No futuro, virá do banco de dados
      };
      
      localStorage.setItem("clienteData", JSON.stringify(clienteData));
      navigate("/cliente/pagamento");
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-amber-50 p-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-0">
          <div className="p-4 md:p-6 flex flex-col items-center">
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-12 md:h-16 mb-6"
            />
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados do Cartão</h2>
            
            <CardForm 
              matricula={matricula}
              onCardSaved={handleCardSaved}
            />
          </div>
        </Card>

        <Card className="bg-white shadow-lg rounded-xl overflow-hidden border-0" onClick={!cardSaved ? handleFormClick : undefined}>
          <div className={`p-4 md:p-6 flex flex-col items-center ${!cardSaved ? 'opacity-70 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados Pessoais</h2>
            
            <PersonalInfoForm
              nomeCompleto={nomeCompleto}
              cpf={cpf}
              email={email}
              telefone={telefone}
              onNomeCompletoChange={setNomeCompleto}
              onCpfChange={setCpf}
              onEmailChange={setEmail}
              onTelefoneChange={setTelefone}
            />
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Finalização</h2>
            
            <OrderSummary
              quantity={quantity}
              valorUnitario={valorUnitario}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
              onFinalizarCompra={handleFinalizarCompra}
              isSubmitting={isSubmitting}
            />
            
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

export default Cadastro;
