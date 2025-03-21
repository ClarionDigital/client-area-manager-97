
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSecurity } from "@/hooks/use-security";
import { getCardTypeFromEmployeeId } from "@/utils/cardHelpers";
import CardSection from "@/components/cliente/CardSection";
import FormSection from "@/components/cliente/FormSection";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  useSecurity();
  
  const [usuarioDados, setUsuarioDados] = useState<{
    matricula: string;
    nomeAbreviado: string;
    nomeCompleto: string;
    foto?: string | null;
  } | null>(null);
  
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
  const [previewUrl, setPreviewUrl] = useState("");
  
  const valorUnitario = 66.40;
  
  useEffect(() => {
    // Recuperar dados do usuário do localStorage
    const dadosUsuarioJSON = localStorage.getItem("usuarioDados");
    
    if (!dadosUsuarioJSON) {
      toast({
        title: "Sessão expirada",
        description: "Por favor, faça login novamente",
        variant: "destructive",
      });
      navigate("/cliente/login");
      return;
    }
    
    try {
      const dadosUsuario = JSON.parse(dadosUsuarioJSON);
      setUsuarioDados(dadosUsuario);
      setNomeAbreviado(dadosUsuario.nomeAbreviado);
      setNomeCompleto(dadosUsuario.nomeCompleto);
      
      // Se o usuário já tiver foto, definir a URL da foto
      if (dadosUsuario.foto) {
        setFotoUrl(dadosUsuario.foto);
      }
      
      // Gerar URL de pré-visualização com a flag de amostra
      const cardId = dadosUsuario.matricula.startsWith("3") ? "3" : "7";
      const previewUrl = `https://areadocliente.alternativacard.com/up/card-model.php?nome=${encodeURIComponent(dadosUsuario.nomeAbreviado)}&nome_completo=${encodeURIComponent(dadosUsuario.nomeCompleto)}&matricula=${encodeURIComponent(dadosUsuario.matricula)}&foto=${dadosUsuario.foto ? encodeURIComponent(dadosUsuario.foto) : ""}&id=${cardId}&amostra=true`;
      setPreviewUrl(previewUrl);
    } catch (error) {
      console.error("Erro ao processar dados do usuário:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao carregar seus dados",
        variant: "destructive",
      });
      navigate("/cliente/login");
    }
  }, [navigate, toast]);
  
  const handleCardSaved = (cardData: {
    nomeAbreviado: string;
    nomeCompleto: string;
    foto: File | null;
    fotoUrl: string | null;
    previewUrl: string;
  }) => {
    setNomeAbreviado(cardData.nomeAbreviado);
    setNomeCompleto(cardData.nomeCompleto);
    setFoto(cardData.foto);
    setFotoUrl(cardData.fotoUrl);
    setPreviewUrl(cardData.previewUrl);
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
      await new Promise(resolve => setTimeout(resolve, 800));

      const clienteData = {
        nomeCompleto: formNome.value,
        cpf: formCpf.value,
        email: formEmail.value,
        telefone: formTelefone.value,
        quantity,
        valorUnitario,
        nomeAbreviado,
        previewUrl,
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
  
  if (!usuarioDados) {
    return (
      <div className="min-h-screen bg-amber-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#8cdcd8] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-amber-50 p-4 md:py-8">
      <div className="max-w-5xl mx-auto">
        <CardSection 
          matricula={usuarioDados.matricula}
          nomeAbreviado={usuarioDados.nomeAbreviado}
          nomeCompleto={usuarioDados.nomeCompleto}
          fotoUrl={usuarioDados.foto || null}
          previewUrl={previewUrl}
          onCardSaved={handleCardSaved}
        />

        <FormSection 
          cardSaved={cardSaved}
          nomeCompleto={nomeCompleto}
          cpf={cpf}
          email={email}
          telefone={telefone}
          quantity={quantity}
          valorUnitario={valorUnitario}
          isSubmitting={isSubmitting}
          onFormClick={handleFormClick}
          onNomeCompletoChange={setNomeCompleto}
          onCpfChange={setCpf}
          onEmailChange={setEmail}
          onTelefoneChange={setTelefone}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onFinalizarCompra={handleFinalizarCompra}
        />
      </div>
    </div>
  );
};

export default Cadastro;
