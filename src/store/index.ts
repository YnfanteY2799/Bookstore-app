import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ISessionStore, T_Theme } from "@/types";

export const useSessionStore = create(
  persist<ISessionStore>(
    (set) => ({
      user: null,
      theme: "emerald",
      setTheme: (s: T_Theme) => set((x) => ({ ...x, theme: s })),
    }),
    { name: "sessionStore" }
  )
);
