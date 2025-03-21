
import { useState } from 'react';
import { cardService } from '@/services/cardService';
import { storageService } from '@/services/storageService';

export const useCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async (matricula?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (matricula) {
        // Buscar cartões por matrícula
        response = await cardService.getCardsByMatricula(matricula);
      } else {
        // Buscar todos os cartões (para administradores)
        response = await cardService.getAllCards();
      }
      
      if (response.success && response.data) {
        setCards(response.data);
      } else {
        setError('Erro ao buscar cartões');
      }
    } catch (err) {
      console.error('Erro ao buscar cartões:', err);
      setError('Erro ao buscar cartões');
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveCard = async (cardData: {
    usuario_id: string,
    matricula: string,
    nome_abreviado: string,
    nome_completo: string,
    foto: File | null,
    foto_url: string | null,
    preview_url: string
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let fotoUrl = cardData.foto_url;
      
      // Se há uma nova foto, fazer upload
      if (cardData.foto) {
        const uploadResult = await storageService.uploadPhoto(
          cardData.foto, 
          `fotos-cartoes/${cardData.usuario_id}`
        );
        
        if (uploadResult.success) {
          fotoUrl = uploadResult.url;
        } else {
          throw new Error('Falha ao fazer upload da foto');
        }
      }
      
      // Salvar o cartão
      const saveResult = await cardService.saveCard({
        usuario_id: cardData.usuario_id,
        matricula: cardData.matricula,
        nome_abreviado: cardData.nome_abreviado,
        nome_completo: cardData.nome_completo,
        foto_url: fotoUrl,
        preview_url: cardData.preview_url
      });
      
      if (saveResult.success) {
        // Atualizar lista de cartões localmente
        if (saveResult.data) {
          setCards(prev => [...prev, saveResult.data]);
        }
        return { success: true, data: saveResult.data };
      } else {
        throw new Error('Falha ao salvar o cartão');
      }
    } catch (err: any) {
      console.error('Erro ao salvar cartão:', err);
      setError(err.message || 'Erro ao salvar cartão');
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateCardStatus = async (cardId: string, status: 'pendente' | 'pago' | 'impresso' | 'entregue') => {
    setIsLoading(true);
    
    try {
      const response = await cardService.updatePaymentStatus(cardId, status);
      
      if (response.success) {
        // Atualizar estado local
        setCards(prev => 
          prev.map(card => 
            card.id === cardId ? { ...card, status } : card
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      setError('Erro ao atualizar status do cartão');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cards,
    isLoading,
    error,
    fetchCards,
    saveCard,
    updateCardStatus
  };
};
