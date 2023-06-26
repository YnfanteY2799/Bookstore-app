import { ReactElement } from "react";
import { BasicModal } from "@/components";

import type { ITableActionModalProps } from "@/types";

export default function DeleteModal({
  handle,
  isOpen,
  ModalAction,
  ActiveItem,
}: ITableActionModalProps): ReactElement {
  return (
    <BasicModal
      isOpen={isOpen}
      handle={handle}
      ok={{
        title: "Yes!",
        action: () => {
          ModalAction && ModalAction(ActiveItem);
          handle();
        },
      }}
      title="Dialog"
    >
      <p>
        Do you want to delete Item # <strong>{ActiveItem?.toString().toUpperCase()}</strong>
      </p>
    </BasicModal>
  );
}
