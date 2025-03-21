
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
import AdminArea from "./pages/AdminArea";
import AdminAltArea from "./pages/AdminAltArea";
import NotFound from "./pages/NotFound";

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
          
          <Route path="/admin" element={<AdminArea />} />
          <Route path="/admin-alt" element={<AdminAltArea />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
