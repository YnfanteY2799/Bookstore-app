import type { ReactNode } from "react";
import type { T_Theme } from "./index";

export interface GWrapperProps {
  children?: ReactNode;
  theme?: T_Theme;
}

export interface GProps {
  theme?: T_Theme;
}
