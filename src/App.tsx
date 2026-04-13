import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import AppNav from "@/components/AppNav";
import StudentsPage from "./pages/StudentsPage";
import GroupsPage from "./pages/GroupsPage";
import SeatingPage from "./pages/SeatingPage";
import GamePage from "./pages/GamePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <div style={{ minHeight: '100vh', background: 'hsl(var(--color-surface))' }}>
            <AppNav />
            <Routes>
              <Route path="/" element={<StudentsPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/seating" element={<SeatingPage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
