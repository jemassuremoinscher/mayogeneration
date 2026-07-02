import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import LocationPage from "./pages/LocationPage";
import B2BPage from "./pages/B2BPage";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import MammouthGroup from "./pages/MammouthGroup";
import Admin from "./pages/Admin";
import SimulateurCout from "./pages/SimulateurCout";
import Diagnostic from "./pages/Diagnostic";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/entreprises" element={<B2BPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/mammouth-group" element={<MammouthGroup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/simulateur-cout-creche" element={<SimulateurCout />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/:slug" element={<LocationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
