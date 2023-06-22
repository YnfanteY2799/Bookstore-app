import RootPage from "@/routes/root/index";
import LoginPage from "@/routes/login/index";

import type { RouteObject } from "react-router-dom";

export const routes: Array<RouteObject> = [
     { path: "/", element: <RootPage /> },
     { path: "/Login", element: <LoginPage /> }
];
