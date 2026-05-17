
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import HousePage from "./pages/HousePage";
import RegisterPage from "./pages/RegisterPage";
import TopicsPage from "./pages/TopicsPage";
import TopicsClassicPage from "./pages/TopicsClassicPage";
import SKPanel from "./pages/SKPanel";
import CHKPanel from "./pages/CHKPanel";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/house" element={<HousePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics-classic" element={<TopicsClassicPage />} />
          <Route path="/login" element={<SKPanel />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/listen" element={<CHKPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;