import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@/routes";

import type { ReactElement } from "react";

export default function App(): ReactElement {
  // Hook Router
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
