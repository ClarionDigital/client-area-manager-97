
import { CardData, CardDataWithPhoto, UploadedEmployee } from '@/types/admin';

// Get card type based on employee ID
export const getCardTypeFromEmployeeId = (id: string): string => {
  if (id.startsWith('3')) return 'Light';
  if (id.startsWith('7')) return 'Conecta';
  return 'Light'; // Default fallback
};

// Create a new entry for link-filled form
export const createLinkFilledEntry = (employee: UploadedEmployee) => {
  return {
    id: Date.now(), // Use timestamp as unique ID
    nome: employee.nome,
    primeiroNome: employee.nome.split(' ')[0],
    matricula: employee.matricula,
    tipo: employee.tipo,
    foto: false,
    validade: employee.validade || "12/2024",
    cargo: employee.cargo || "",
    setor: employee.setor || "",
    // Add required fields with default values
    email: "",
    telefone: "",
    empresa: "",
    dataPreenchimento: new Date().toLocaleDateString(),
    linkId: ""
  };
};
