
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Valores padrão para ambiente de desenvolvimento local
let supabaseUrl = 'http://localhost:54321';
let supabaseAnonKey = 'sua-chave-anon-local';

// Verificar se existem credenciais salvas no localStorage
const savedConfig = localStorage.getItem('supabaseConfig');
if (savedConfig) {
  const config = JSON.parse(savedConfig);
  supabaseUrl = config.url;
  supabaseAnonKey = config.key;
}

// Criar cliente Supabase com as credenciais configuradas
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Função para atualizar as credenciais do Supabase
export const updateSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem('supabaseConfig', JSON.stringify({ url, key }));
  window.location.reload(); // Recarregar a página para aplicar as novas credenciais
};

// Função para verificar conexão com o Supabase
export const testSupabaseConnection = async () => {
  try {
    // Tenta fazer uma query simples para testar a conexão
    const { data, error } = await supabase.from('administradores').select('count', { count: 'exact' }).limit(1);
    
    if (error) throw error;
    
    return { success: true, message: 'Conexão estabelecida com sucesso!' };
  } catch (error: any) {
    console.error('Erro ao testar conexão:', error);
    return { 
      success: false, 
      message: `Erro na conexão: ${error.message || 'Verifique suas credenciais.'}` 
    };
  }
};
