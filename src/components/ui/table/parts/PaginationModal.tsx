import { ReactElement, useState, KeyboardEvent, ChangeEvent } from "react";
import { BasicModal } from "@/components";

import type { ITableActionModalProps } from "@/types";

export default function PaginationModal({
  ModalAction,
  ActiveItem,
  isOpen,
  handle,
}: ITableActionModalProps): ReactElement {
  const [nextPage, setNextPage] = useState(0 as number);

  function Action() {
    ModalAction && ModalAction(nextPage);
    setNextPage(1);
    handle();
  }

  function cleandAndClose() {
    setNextPage(0);
    handle();
  }

  function keyDownActions({ key }: KeyboardEvent<HTMLInputElement>) {
    key === "Escape" && cleandAndClose();
    key === "Enter" && Action();
  }

  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setNextPage(parseInt(value === "" ? "0" : value));
  }

  return (
    <BasicModal
      isOpen={isOpen}
      handle={handle}
      ok={{ title: "Ok!", action: () => Action() }}
      title={`Jump from page ${ActiveItem} to page : `}
    >
      <div className="w-full max-w-xs form-control">
        <input
          data-theme="corporate"
          type="number"
          value={nextPage}
          onChange={handleChange}
          onKeyDown={keyDownActions}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
    </BasicModal>
  );
}
