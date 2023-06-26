import { type ReactElement } from "react";
import { Footer, Navbar } from "../common";
import { useSessionStore } from "@/store";

import type { GWrapperProps } from "@/types";

export default function PageWrapper({ children }: GWrapperProps): ReactElement {
  const { theme, user } = useSessionStore((s) => s);

  console.log(user);

  return (
    <div className="flex flex-col min-h-screen" data-theme={theme}>
      <Navbar isLogged={user !  == null} />
      {children}
      <Footer />
    </div>
  );
}
