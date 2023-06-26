import { ReactElement, useState } from "react";
import { Edit2, Trash2, User as UserIcon } from "lucide-react";
import {
  TableActionDropdown,
  DeleteModal,
  PaginationModal,
  TableOptionsHeader,
} from "./parts";
import { useModal } from "@/hooks";

import type { GenericTableProps } from "@/types";

export default function Table<T>({
  tableData,
  tableHead,
  Add,
  edit,
  kill,
  filter,
  maxLength,
  actSlice,
  prev,
  refetch,
  next,
  jump,
  isFetching,
}: GenericTableProps<T>): ReactElement {
  // Hooks
  const { modalOpen, handle } = useModal();
  const { modalOpen: modalS, handle: handleS } = useModal();

  const [deletingUser, setDeletingUser] = useState("" as string);

  function actualEdit(Id_Number: any): void {
    edit && edit(Id_Number);
  }

  function actualDeletion(Id_Number: any): void {
    setDeletingUser(Id_Number);
    handle();
  }

  return (
    <>
      <DeleteModal
        isOpen={modalOpen}
        handle={handle}
        ModalAction={kill}
        ActiveItem={deletingUser}
      />

      <PaginationModal ModalAction={jump} isOpen={modalS} handle={handleS} ActiveItem={actSlice} />

      <div className="container px-4 mx-auto sm:px-8 ">
        {/* Up options */}

        <TableOptionsHeader<T>
          tableHead={tableHead}
          isFetching={isFetching}
          Add={Add}
          filter={filter}
          refetch={refetch}
        />

        {/* Table */}
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {tableHead.map(({ name }, i: number) => (
                  <th
                    className="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    key={i}
                  >
                    {name}
                  </th>
                ))}
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((x, i) => (
                <tr key={i}>
                  <td className="px-5 py-4 text-sm bg-white border-b border-gray-200 sm:py-2 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <UserIcon />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{x.firstname}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">{x.email}</p>
                  </td>

                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">{x.role}</p>
                  </td>

                  <td className="px-5 py-5 text-sm text-center bg-white border-b border-gray-200">
                    <TableActionDropdown
                      options={[
                        {
                          label: "Edit",
                          action: () => actualEdit(email),
                          icon: <Edit2 size={15} />,
                        },
                        {
                          label: "Delete",
                          action: () => actualDeletion(email),
                          icon: <Trash2 size={15} />,
                        },
                      ]}
                      key={i}
                    />

                    <button></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col px-5 py-5 bg-white border-t xs:flex-row xs:justify-between ">
            <div className="flex justify-between mt-2 xs:mt-0">
              <button
                className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                onClick={prev}
              >
                Prev
              </button>
              <span
                className="pt-1 text-gray-900 cursor-pointer hover:underline"
                onClick={() => handleS()}
              >
                Page #{actSlice} of {maxLength}
              </span>

              <button
                className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                onClick={next}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
