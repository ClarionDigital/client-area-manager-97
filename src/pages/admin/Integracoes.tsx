
import React from 'react';
import SupabaseConfigForm from '@/components/admin/SupabaseConfigForm';

const Integracoes: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#52aa85] mb-4">Integrações</h2>
        <p className="text-gray-600 mb-6">
          Configure suas integrações externas para usar com o sistema.
        </p>
      </div>
      
      <div className="space-y-8">
        <SupabaseConfigForm />
      </div>
    </div>
  );
};

export default Integracoes;
