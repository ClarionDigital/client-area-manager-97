
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          nome: string
          nome_abreviado: string
          matricula: string
          foto_url: string | null
          criado_em: string
          atualizado_em: string
        }
        Insert: {
          id?: string
          email: string
          nome: string
          nome_abreviado: string
          matricula: string
          foto_url?: string | null
          criado_em?: string
          atualizado_em?: string
        }
        Update: {
          id?: string
          email?: string
          nome?: string
          nome_abreviado?: string
          matricula?: string
          foto_url?: string | null
          atualizado_em?: string
        }
      }
      cartoes: {
        Row: {
          id: string
          usuario_id: string
          matricula: string
          nome_abreviado: string
          nome_completo: string
          foto_url: string | null
          preview_url: string
          status: 'pendente' | 'pago' | 'impresso' | 'entregue'
          criado_em: string
          atualizado_em: string
        }
        Insert: {
          id?: string
          usuario_id: string
          matricula: string
          nome_abreviado: string
          nome_completo: string
          foto_url?: string | null
          preview_url: string
          status?: 'pendente' | 'pago' | 'impresso' | 'entregue'
          criado_em?: string
          atualizado_em?: string
        }
        Update: {
          usuario_id?: string
          matricula?: string
          nome_abreviado?: string
          nome_completo?: string
          foto_url?: string | null
          preview_url?: string
          status?: 'pendente' | 'pago' | 'impresso' | 'entregue'
          atualizado_em?: string
        }
      }
      administradores: {
        Row: {
          id: string
          email: string
          nome: string
          papel: 'admin' | 'usuario'
          criado_em: string
          atualizado_em: string
        }
        Insert: {
          id?: string
          email: string
          nome: string
          papel?: 'admin' | 'usuario'
          criado_em?: string
          atualizado_em?: string
        }
        Update: {
          email?: string
          nome?: string
          papel?: 'admin' | 'usuario'
          atualizado_em?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
