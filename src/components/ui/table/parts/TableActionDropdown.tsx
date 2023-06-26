import { ReactElement } from "react";
import { MoreHorizontal } from "lucide-react";

import type { TableDropdownMenuProps } from "@/types";

export default function DropdownMenu({
  options = [],
  isLast,
}: TableDropdownMenuProps): ReactElement {
  return (
    <div className={isLast ? "dropdown dropdown-left dropdown-end" : "dropdown dropdown-end"}>
      <label tabIndex={0} className="cursor-pointer">
        <MoreHorizontal size={20} />
      </label>
      <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-200 rounded-box w-52">
        {options.map(({ label, action, icon }, i) => (
          <li key={i} onClick={action}>
            <button>
              {icon}
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
