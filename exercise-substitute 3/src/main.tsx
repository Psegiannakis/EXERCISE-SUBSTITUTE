import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./header";
import "./styles.css";
import Body from "./body";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Header />
      <Body />
    </QueryClientProvider>
  </React.StrictMode>
);
