import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BirdListProvider } from "./context/BirdListContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // data jsou "čerstvá" 5 minut
      retry: 2, // při chybě zkusí 2× znovu
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BirdListProvider>
        <App />
      </BirdListProvider>
    </QueryClientProvider>
  </StrictMode>,
);
