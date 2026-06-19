import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
            <Toaster theme="dark" position="top-right" />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
