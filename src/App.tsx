
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import AddReport from "./pages/AddReport";
import ReportDetail from "./pages/ReportDetail";
import ReportEdit from "./pages/ReportEdit";
import Users from "./pages/Users";
import Statistics from "./pages/Statistics";
import Download from "./pages/Download";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/add" element={<AddReport />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route path="/reports/:id/edit" element={<ReportEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/download" element={<Download />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
