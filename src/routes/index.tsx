import RootPage from "@/routes/public/root/index";
import LoginPage from "@/routes/public/login/index";
import DashboardPage from "@/routes/protected/dashboard/index";
import MaintainmentPage from "@/routes/protected/maintainment/index";

import type { RouteObject } from "react-router-dom";

export const routes: Array<RouteObject> = [
     { path: "/", element: <RootPage /> },
     { path: "/Login", element: <LoginPage /> },
     { path: "/Dashboard", element: <DashboardPage /> },
     { path: "/Maintenance", element: <MaintainmentPage /> }
];
