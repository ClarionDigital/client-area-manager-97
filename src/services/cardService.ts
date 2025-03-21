
import { supabase } from '@/lib/supabase';

export const cardService = {
  // Buscar cartões por matrícula
  getCardsByMatricula: async (matricula: string) => {
    try {
      const { data, error } = await supabase
        .from('cartoes')
        .select('*')
        .eq('matricula', matricula);
        
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      return { success: false, error };
    }
  },
  
  // Salvar um novo cartão
  saveCard: async (cardData: {
    usuario_id: string,
    matricula: string,
    nome_abreviado: string,
    nome_completo: string,
    foto_url: string | null,
    preview_url: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('cartoes')
        .insert([cardData])
        .select();
        
      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      return { success: false, error };
    }
  },
  
  // Atualizar status de pagamento
  updatePaymentStatus: async (cardId: string, status: 'pendente' | 'pago' | 'impresso' | 'entregue') => {
    try {
      const { data, error } = await supabase
        .from('cartoes')
        .update({ status })
        .eq('id', cardId)
        .select();
        
      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return { success: false, error };
    }
  },
  
  // Buscar todos os cartões (para admin)
  getAllCards: async () => {
    try {
      const { data, error } = await supabase
        .from('cartoes')
        .select('*')
        .order('criado_em', { ascending: false });
        
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      return { success: false, error };
    }
  }
};
