import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { routes } from "@/routes";

import type { ReactElement } from "react";

export default function App(): ReactElement {
  
  // Hooks && Router
  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
