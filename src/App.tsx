import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { routes } from "@/routes";

import type { ReactElement } from "react";

export default function App(): ReactElement {
  // Create a client
  const queryClient = new QueryClient();

  // Hook Router
  const router = createBrowserRouter(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
