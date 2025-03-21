
import React from 'react';

const AdminAltPedidos: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Pedidos</h2>
        <button className="bg-[#062b48] hover:bg-[#051f33] text-white px-4 py-2 rounded-md text-sm">
          Novo Pedido
        </button>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option value="todos">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="processando">Processando</option>
            <option value="concluido">Concluído</option>
          </select>
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option value="30">Últimos 30 dias</option>
            <option value="60">Últimos 60 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Buscar por ID ou cliente..." 
            className="border rounded-md px-3 py-1.5 text-sm w-64"
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Cartões</th>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[1, 2, 3, 4, 5].map((index) => (
              <tr key={index} className="text-sm">
                <td className="px-4 py-3">#ALT-{2025 - index}</td>
                <td className="px-4 py-3">Empresa {String.fromCharCode(65 + index)}</td>
                <td className="px-4 py-3">{index * 5 + 10}</td>
                <td className="px-4 py-3">01/0{index}/2023</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                    index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index % 3 === 0 ? 'Concluído' : 
                     index % 3 === 1 ? 'Em Processo' : 
                     'Pendente'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Ver</button>
                    <button className="text-green-600 hover:text-green-800">Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Mostrando 1-5 de 25 resultados
        </div>
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

export default AdminAltPedidos;
