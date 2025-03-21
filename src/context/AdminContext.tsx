
import React, { createContext, useContext, useState } from 'react';
import { CardData, CardDataWithPhoto, UploadedEmployee, FinancialData } from '@/types/admin';

// Sample data
const segundasVias: CardData[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", data: "12/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", data: "15/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", data: "18/05/2023", status: "Pendente", valor: "--", tipo: "Conecta" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", data: "20/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", data: "22/05/2023", status: "Cancelado", valor: "--", tipo: "Conecta" },
  { id: 6, nome: "Fernanda Lima", matricula: "3025467", data: "25/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 7, nome: "Ricardo Souza", matricula: "7056234", data: "26/05/2023", status: "Pendente", valor: "--", tipo: "Conecta" },
  { id: 8, nome: "Juliana Alves", matricula: "3037654", data: "27/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 9, nome: "Eduardo Mendes", matricula: "7069872", data: "28/05/2023", status: "Cancelado", valor: "--", tipo: "Conecta" },
  { id: 10, nome: "Patrícia Rocha", matricula: "3045678", data: "29/05/2023", status: "Pago", valor: "--", tipo: "Light" },
];

const dadosCartoes: CardDataWithPhoto[] = [
  { id: 1, nome: "Carlos Silva", primeiroNome: "Carlos", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", data: "12/05/2023", status: "Ativo", valor: "--" },
  { id: 2, nome: "Maria Santos", primeiroNome: "Maria", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light", data: "15/05/2023", status: "Ativo", valor: "--" },
  { id: 3, nome: "José Oliveira", primeiroNome: "José", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta", data: "18/05/2023", status: "Pendente", valor: "--" },
  { id: 4, nome: "Ana Rodrigues", primeiroNome: "Ana", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light", data: "20/05/2023", status: "Ativo", valor: "--" },
  { id: 5, nome: "Paulo Costa", primeiroNome: "Paulo", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta", data: "22/05/2023", status: "Inativo", valor: "--" },
  { id: 6, nome: "Fernanda Lima", primeiroNome: "Fernanda", matricula: "3025467", cargo: "Diretora", setor: "Comercial", validade: "12/2024", foto: true, tipo: "Light", data: "25/05/2023", status: "Ativo", valor: "--" },
];

// Sample uploaded employees data
const mockUploadedEmployees: UploadedEmployee[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", tipo: "Light", foto: true },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", tipo: "Light", foto: true },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", tipo: "Conecta", foto: true },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", tipo: "Light", foto: true },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", tipo: "Conecta", foto: true },
];

// Sample data for users who filled the form via link
const initialPreenchidosPorLink = [
  { id: 1, nome: "Roberto Almeida", primeiroNome: "Roberto", email: "roberto.almeida@email.com", telefone: "(21) 99876-5432", empresa: "ABC Ltda", matricula: "3001246", tipo: "Light", foto: false, validade: "12/2024", cargo: "Desenvolvedor", dataPreenchimento: "02/06/2023", linkId: "LINK-001", setor: "TI" },
  { id: 2, nome: "Camila Ferreira", primeiroNome: "Camila", email: "camila.ferreira@email.com", telefone: "(11) 98765-4321", empresa: "XYZ S.A.", matricula: "3001247", tipo: "Light", foto: false, validade: "12/2024", cargo: "Designer", dataPreenchimento: "03/06/2023", linkId: "LINK-001", setor: "Design" },
  { id: 3, nome: "Marcelo Gomes", primeiroNome: "Marcelo", email: "marcelo.gomes@email.com", telefone: "(31) 97654-3210", empresa: "123 Inc.", matricula: "7031299", tipo: "Conecta", foto: false, validade: "12/2024", cargo: "Gerente de Projetos", dataPreenchimento: "04/06/2023", linkId: "LINK-002", setor: "Projetos" },
  { id: 4, nome: "Luciana Martins", primeiroNome: "Luciana", email: "luciana.martins@email.com", telefone: "(41) 96543-2109", empresa: "Tech Solutions", matricula: "3001248", tipo: "Light", foto: false, validade: "12/2024", cargo: "Analista de Dados", dataPreenchimento: "05/06/2023", linkId: "LINK-002", setor: "Dados" },
  { id: 5, nome: "Felipe Santos", primeiroNome: "Felipe", email: "felipe.santos@email.com", telefone: "(51) 95432-1098", empresa: "Inovação Ltd", matricula: "7031300", tipo: "Conecta", foto: false, validade: "12/2024", cargo: "Diretor de Marketing", dataPreenchimento: "06/06/2023", linkId: "LINK-003", setor: "Marketing" },
];

interface AdminContextType {
  // Estados
  cartoesGerados: CardData[];
  uploadedEmployees: UploadedEmployee[];
  selectedCardType: string;
  preenchidosPorLink: any[];
  novoPedido: UploadedEmployee[];
  
  // Setters
  setCartoesGerados: React.Dispatch<React.SetStateAction<CardData[]>>;
  setUploadedEmployees: React.Dispatch<React.SetStateAction<UploadedEmployee[]>>;
  setSelectedCardType: React.Dispatch<React.SetStateAction<string>>;
  setPreenchidosPorLink: React.Dispatch<React.SetStateAction<any[]>>;
  setNovoPedido: React.Dispatch<React.SetStateAction<UploadedEmployee[]>>;
  
  // Ações
  handleExcluirCartao: (id: number) => void;
  handleUploadPlanilha: (cardType: string) => void;
  handleDownloadPlanilha: () => void;
  handleSubmitOrder: () => void;
  handleRequestSecondCopy: (id: number) => void;
  handleDeleteUploadedEmployee: (id: number) => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartoesGerados, setCartoesGerados] = useState<CardData[]>(segundasVias);
  const [uploadedEmployees, setUploadedEmployees] = useState<UploadedEmployee[]>(mockUploadedEmployees);
  const [selectedCardType, setSelectedCardType] = useState<string>("Todos");
  const [preenchidosPorLink, setPreenchidosPorLink] = useState(initialPreenchidosPorLink);
  const [novoPedido, setNovoPedido] = useState<UploadedEmployee[]>([]);
  
  // Funções de ação
  const handleExcluirCartao = (id: number) => {
    setCartoesGerados(cartoesGerados.filter(cartao => cartao.id !== id));
    setUploadedEmployees(uploadedEmployees.filter(employee => employee.id !== id));
  };
  
  const handleUploadPlanilha = (cardType: string) => {
    setSelectedCardType(cardType);
    
    const newEmployees: UploadedEmployee[] = [
      { id: Date.now(), nome: "Pedro Rocha", matricula: "3005678", tipo: "Light", foto: false, cargo: "Analista", setor: "TI", validade: "12/2024" },
      { id: Date.now() + 1, nome: "Laura Oliveira", matricula: "7008765", tipo: "Conecta", foto: false, cargo: "Gerente", setor: "Vendas", validade: "12/2024" },
      { id: Date.now() + 2, nome: "Roberto Maia", matricula: "3009854", tipo: "Light", foto: false, cargo: "Técnico", setor: "Suporte", validade: "12/2024" },
    ];
    
    setNovoPedido(newEmployees);
  };

  const handleDownloadPlanilha = () => {
    // Implementação do download
  };

  const handleSubmitOrder = () => {
    // Implementação do envio do pedido
  };

  const handleRequestSecondCopy = (id: number) => {
    const employee = uploadedEmployees.find(emp => emp.id === id);
    
    if (employee) {
      const newEntry = {
        id: Date.now(),
        nome: employee.nome,
        primeiroNome: employee.nome.split(' ')[0],
        matricula: employee.matricula,
        tipo: employee.tipo,
        foto: false,
        validade: employee.validade || "12/2024",
        cargo: employee.cargo || "",
        setor: employee.setor || "",
        email: "",
        telefone: "",
        empresa: "",
        dataPreenchimento: new Date().toLocaleDateString(),
        linkId: ""
      };
      
      setPreenchidosPorLink(prev => [...prev, newEntry]);
    }
  };
  
  const handleDeleteUploadedEmployee = (id: number) => {
    setUploadedEmployees(prev => prev.filter(emp => emp.id !== id));
  };
  
  const value = {
    cartoesGerados,
    setCartoesGerados,
    uploadedEmployees,
    setUploadedEmployees,
    selectedCardType,
    setSelectedCardType,
    preenchidosPorLink,
    setPreenchidosPorLink,
    novoPedido,
    setNovoPedido,
    handleExcluirCartao,
    handleUploadPlanilha,
    handleDownloadPlanilha,
    handleSubmitOrder,
    handleRequestSecondCopy,
    handleDeleteUploadedEmployee
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

// Hook para usar o contexto
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider');
  }
  return context;
};
