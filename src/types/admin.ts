
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
  cargo: string;
  setor: string;
  validade: string;
  foto: boolean;
}
