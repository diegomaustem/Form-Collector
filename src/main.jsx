import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import GoodForm from "./components/GoodForm";
import IndexPanel from "./components/IndexPanel";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoodForm />
      <IndexPanel></IndexPanel>
    </QueryClientProvider>
  </StrictMode>
);
