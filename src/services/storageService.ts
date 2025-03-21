
import { supabase } from '@/lib/supabase';

export const storageService = {
  // Upload de foto para o storage do Supabase
  uploadPhoto: async (file: File, path: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('fotos')
        .upload(filePath, file);
        
      if (error) throw error;
      
      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from('fotos')
        .getPublicUrl(filePath);
        
      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      return { success: false, error };
    }
  },
  
  // Deletar foto
  deletePhoto: async (path: string) => {
    try {
      const { error } = await supabase.storage
        .from('fotos')
        .remove([path]);
        
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      return { success: false, error };
    }
  }
};
