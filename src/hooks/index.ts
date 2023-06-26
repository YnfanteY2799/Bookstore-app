import { useState } from "react";

import type { ModalHook } from "@/types";

export function useModal(isOpen: boolean = false): ModalHook {
  const [modalOpen, setModalOpen] = useState(
    isOpen !== undefined ? isOpen : (false as boolean)
  );

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  const handle = () => setModalOpen(!modalOpen);

  return { modalOpen, close, open, handle };
}
