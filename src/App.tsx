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
import { TeamManagement } from "./pages/TeamManagement";
import { ApiIntegrations } from "./pages/ApiIntegrations";
import { LanguageProvider } from "./contexts/LanguageContext";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { PlanManagement } from "./pages/admin/PlanManagement";
import { FinancialManagement } from "./pages/admin/FinancialManagement";
import { AdminNotifications } from "./pages/admin/AdminNotifications";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminInvoices } from "./pages/admin/AdminInvoices";
import { AdminResources } from "./pages/admin/AdminResources";
import { AdminLogs } from "./pages/admin/AdminLogs";
import { AdminReports } from "./pages/admin/AdminReports";
import { AdminIntegrations } from "./pages/admin/AdminIntegrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
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
          <Route path="/dashboard/team" element={<TeamManagement />} />
          <Route path="/dashboard/api" element={<ApiIntegrations />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/plans" element={<PlanManagement />} />
          <Route path="/admin/financial" element={<FinancialManagement />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          <Route path="/admin/resources" element={<AdminResources />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/integrations" element={<AdminIntegrations />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
  </QueryClientProvider>
);

export default App;
