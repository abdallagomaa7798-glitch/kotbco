import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster position="bottom-left" richColors />
        <Home />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
