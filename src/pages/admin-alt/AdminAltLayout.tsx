
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AdminAltLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[#062b48]">Alternativa Admin</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              <NavLink 
                to="/admin-alt/dashboard" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md text-sm ${isActive ? 'bg-[#062b48] text-white' : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/admin-alt/pedidos" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md text-sm ${isActive ? 'bg-[#062b48] text-white' : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                Pedidos
              </NavLink>
              <NavLink 
                to="/admin-alt/cartoes" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md text-sm ${isActive ? 'bg-[#062b48] text-white' : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                Cartões
              </NavLink>
            </nav>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminAltLayout;
