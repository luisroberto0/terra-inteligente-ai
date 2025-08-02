import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { AdvancedDashboard } from "./pages/AdvancedDashboard";
import { History } from "./pages/History";
import { Account } from "./pages/Account";
import { Demo } from "./pages/Demo";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Notifications } from "./pages/Notifications";
import { ExecutiveDashboard } from "./pages/ExecutiveDashboard";
import { Consulting } from "./pages/Consulting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/advanced" element={<AdvancedDashboard />} />
          <Route path="/dashboard/executive" element={<ExecutiveDashboard />} />
          <Route path="/dashboard/consulting" element={<Consulting />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
