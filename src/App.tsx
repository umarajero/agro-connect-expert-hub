import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import FarmerAuth from "./pages/FarmerAuth";
import ExpertAuth from "./pages/ExpertAuth";
import Experts from "./pages/Experts";
import BecomeExpert from "./pages/BecomeExpert";
import SoilMap from "./pages/SoilMap";
import Weather from "./pages/Weather";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/farmer-auth" element={<FarmerAuth />} />
            <Route path="/expert-auth" element={<ExpertAuth />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/become-expert" element={<BecomeExpert />} />
            <Route path="/soil-map" element={<SoilMap />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/articles" element={<Articles />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
