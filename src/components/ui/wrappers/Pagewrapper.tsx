import { type ReactElement } from "react";
import { Footer, Navbar } from "../common";
import type { GWrapperProps } from "@/types";
import { useSessionStore } from "@/store";

export default function PageWrapper({ children }: GWrapperProps): ReactElement {

  const { theme, user } = useSessionStore((s) => s);


  return (
    <div className="flex flex-col min-h-screen" data-theme={theme}>
      <Navbar isLogged={!user}/>
      {children}
      <Footer />
    </div>
  );
}
