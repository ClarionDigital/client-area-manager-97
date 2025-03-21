
import React from 'react';

const AdminAltDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard Alternativa</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <div className="text-sm text-blue-700 font-medium">Total de Pedidos</div>
          <div className="text-2xl font-bold mt-1">128</div>
          <div className="text-sm text-blue-600 mt-2">+12% em relação ao mês anterior</div>
        </div>
        
        <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
          <div className="text-sm text-green-700 font-medium">Cartões Processados</div>
          <div className="text-2xl font-bold mt-1">523</div>
          <div className="text-sm text-green-600 mt-2">+5% em relação ao mês anterior</div>
        </div>
        
        <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg">
          <div className="text-sm text-purple-700 font-medium">Clientes Ativos</div>
          <div className="text-2xl font-bold mt-1">42</div>
          <div className="text-sm text-purple-600 mt-2">+8% em relação ao mês anterior</div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-medium mb-3">Últimas Atividades</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Pedido</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="text-sm">
                <td className="px-4 py-3">#ALT-2023</td>
                <td className="px-4 py-3">Empresa ABC</td>
                <td className="px-4 py-3">02/07/2023</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Concluído</span></td>
              </tr>
              <tr className="text-sm">
                <td className="px-4 py-3">#ALT-2022</td>
                <td className="px-4 py-3">Empresa XYZ</td>
                <td className="px-4 py-3">01/07/2023</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Em Processo</span></td>
              </tr>
              <tr className="text-sm">
                <td className="px-4 py-3">#ALT-2021</td>
                <td className="px-4 py-3">Empresa DEF</td>
                <td className="px-4 py-3">30/06/2023</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Concluído</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAltDashboard;
