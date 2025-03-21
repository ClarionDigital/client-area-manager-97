
import React from 'react';

const AdminAltCartoes: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Cartões</h2>
      
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option value="todos">Todos os Tipos</option>
            <option value="light">Light</option>
            <option value="conecta">Conecta</option>
          </select>
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option value="todos">Todos os Status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="bloqueado">Bloqueado</option>
          </select>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Buscar por matrícula ou nome..." 
            className="border rounded-md px-3 py-1.5 text-sm w-64"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-4 flex flex-col items-center">
              <div className="w-full max-w-[180px] aspect-[292/451] bg-gradient-to-b from-blue-50 to-blue-100 mb-3 rounded overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs text-center text-gray-500">
                    Cartão {index % 2 === 0 ? 'Light' : 'Conecta'}<br />
                    Preview
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">{
                ['João Silva', 'Maria Oliveira', 'Pedro Santos', 'Ana Lima', 'Carlos Souza', 
                 'Laura Pereira', 'Bruno Costa', 'Fernanda Almeida', 'Rafael Martins'][index]
              }</div>
              <div className="text-xs text-gray-500 mt-1">Matrícula: {index === 0 ? '3' : index === 1 ? '7' : ''}0{index}123</div>
              <div className="mt-3 flex justify-center gap-2">
                <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                  Visualizar
                </button>
                <button className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded hover:bg-gray-100">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded-md text-sm">Anterior</button>
          <button className="px-3 py-1 bg-[#062b48] text-white rounded-md text-sm">1</button>
          <button className="px-3 py-1 border rounded-md text-sm">2</button>
          <button className="px-3 py-1 border rounded-md text-sm">3</button>
          <button className="px-3 py-1 border rounded-md text-sm">Próximo</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAltCartoes;
