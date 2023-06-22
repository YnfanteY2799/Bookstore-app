export * from "./component";

export type T_Theme = "black" | "emerald" | "";

export type T_User = {
  username: string;
  role: "admin" | "simple user";
} | null;

export interface ISessionStore {
  theme: T_Theme;
  setTheme: (s: T_Theme) => void;
  user?: T_User;
}
