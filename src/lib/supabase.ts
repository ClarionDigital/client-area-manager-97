
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Essas variáveis serão substituídas pelas suas próprias credenciais do Supabase local
const supabaseUrl = 'http://localhost:54321'; // URL padrão para Supabase local
const supabaseAnonKey = 'sua-chave-anon-local';

// Cria um cliente Supabase para uso em toda a aplicação
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
