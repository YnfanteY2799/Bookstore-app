import { MouseEventHandler, ReactNode } from "react";

export * from "./component";

export type T_Theme = "black" | "emerald" | "";

export type T_User = {
  username: string;
  role: "admin" | "simple user";
} | null;

export interface ModalHook {
  modalOpen: boolean;
  close: () => void;
  open: () => void;
  handle: () => void;
}

export type GenericTableHeader<T> = { name: string; obj_val: keyof T };

export interface GenericTableProps<T> {
  tableData: Array<T>;
  tableHead: Array<GenericTableHeader<T>>;
  Add?: MouseEventHandler<HTMLButtonElement>;
  edit?: Function;
  kill?: Function;
  filter?: Function;
  jump?: Function;
  refetch?: MouseEventHandler<HTMLButtonElement>;
  actSlice?: number;
  maxLength?: number;
  next?: MouseEventHandler<HTMLButtonElement>;
  prev?: MouseEventHandler<HTMLButtonElement>;
  isFetching?: boolean;
  handleFileUpload?: Function;
  handleFileExport?: Function;
}

export interface ITableOptionsHProps<T> {
  tableHead: Array<GenericTableHeader<T>>;
  filter?: Function;
  isFetching?: boolean;
  refetch?: MouseEventHandler<HTMLButtonElement>;
  Add?: MouseEventHandler<HTMLButtonElement>;
  addFile?: MouseEventHandler<HTMLButtonElement>;
  exportFile?: MouseEventHandler<HTMLButtonElement>;
}


export interface ISessionStore {
  theme: T_Theme;
  setTheme: (s: T_Theme) => void;
  user?: T_User;
}

export interface ITableActionModalProps {
  ModalAction?: Function;
  ActiveItem?: number | string;
  isOpen: boolean;
  handle: () => void;
}

export interface MProps {
  isOpen: boolean;
  handle: () => void;
  children?: ReactNode;
  ok?: { title: string; action: MouseEventHandler<HTMLButtonElement> };
  title: string;
}

type TableDropdownOption = {
  label: string;
  icon?: ReactNode;
  action?: MouseEventHandler<HTMLLIElement>;
};

export type TableDropdownMenuProps = {
  options: Array<TableDropdownOption>;
  isLast?: boolean;
};
