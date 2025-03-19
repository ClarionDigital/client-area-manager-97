
export interface CardData {
  id: number;
  nome: string;
  matricula: string;
  data: string;
  status: string;
  valor: string;
  tipo: string;
}

export interface TransactionData {
  id: number;
  cliente: string;
  valor: string;
  data: string;
  status: string;
  metodo: string;
}

export interface CardDataWithPhoto extends CardData {
  primeiroNome?: string;
  cargo: string;
  setor: string;
  validade: string;
  foto: boolean;
  editMode?: boolean;
  fotoUrl?: string;
}

export interface SpreadsheetTemplate {
  id: number;
  primeiroNome: string;
  nome: string;
  matricula: string;
  cargo: string;
  setor: string;
  validade: string;
  tipo: string;
}
