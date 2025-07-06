
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Audit from "./pages/Audit";
import Analyzer from "./pages/Analyzer";
import Visualization from "./pages/Visualization";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SecurityAlerts from "./pages/SecurityAlerts";
import TransactionMonitor from "./pages/TransactionMonitor";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/education" element={<Education />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/security-alerts" element={<SecurityAlerts />} />
            <Route path="/transaction-monitor" element={<TransactionMonitor />} />
            <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
