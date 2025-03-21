
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ClienteArea from "./pages/ClienteArea";
import Login from "./pages/cliente/Login";
import Cadastro from "./pages/cliente/Cadastro";
import Pagamento from "./pages/cliente/Pagamento";
import ConfirmacaoPagamento from "./pages/cliente/ConfirmacaoPagamento";
import AdminAltArea from "./pages/AdminAltArea";
import NotFound from "./pages/NotFound";

// Admin module routes
import AdminModular from "./pages/admin";
import AdminLayout from "./pages/admin/AdminLayout";
import CartoesGerados from "./pages/admin/CartoesGerados";
import TodosCartoes from "./pages/admin/TodosCartoes";
import PreenchidosLinks from "./pages/admin/PreenchidosLinks";
import NovoPedido from "./pages/admin/NovoPedido";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Redirecionar de /cliente para /cliente/login */}
          <Route path="/cliente" element={<Navigate to="/cliente/login" replace />} />
          <Route path="/cliente/login" element={<Login />} />
          <Route path="/cliente/cadastro" element={<Cadastro />} />
          <Route path="/cliente/pagamento" element={<Pagamento />} />
          <Route path="/cliente/confirmacao" element={<ConfirmacaoPagamento />} />
          
          {/* Admin-alt routes */}
          <Route path="/admin-alt" element={<AdminAltArea />} />
          
          {/* Admin routes - nova versão modular */}
          <Route path="/admin" element={<AdminModular />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/cartoes-gerados" replace />} />
              <Route path="cartoes-gerados" element={<CartoesGerados />} />
              <Route path="todos-cartoes" element={<TodosCartoes />} />
              <Route path="preenchidos-links" element={<PreenchidosLinks />} />
              <Route path="novo-pedido" element={<NovoPedido />} />
            </Route>
          </Route>
          
          {/* Redirecionar de admin-modular para admin */}
          <Route path="/admin-modular/*" element={<Navigate to="/admin" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
