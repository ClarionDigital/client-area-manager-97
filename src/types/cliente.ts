
// Tipos para a área do cliente

export interface Cliente {
  id?: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  dataCadastro?: string;
}

export interface Cartao {
  id?: string;
  matricula: string;
  nomeAbreviado: string;
  nomeCompleto: string;
  tipo: 'Light' | 'Conecta' | 'Padrão';
  fotoUrl?: string;
  dataEmissao?: string;
  dataValidade?: string;
  status?: 'pendente' | 'aprovado' | 'rejeitado' | 'impresso';
  clienteId?: string;
  previewUrl?: string; // URL para visualização do cartão
}

export interface Pedido {
  id?: string;
  clienteId?: string;
  cliente?: Cliente;
  cartoes?: Cartao[];
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  status: 'aguardando_pagamento' | 'pago' | 'cancelado' | 'em_processamento' | 'concluido';
  dataCriacao: string;
  dataAtualizacao?: string;
  formaPagamento?: 'cartao' | 'boleto' | 'pix';
  codigoPagamento?: string;
}

// Interface para uso na API quando conectar ao banco de dados
export interface PedidoRequest {
  matricula: string;
  nomeAbreviado: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  quantidade: number;
  valorUnitario: number;
}
