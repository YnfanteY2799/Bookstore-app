import { ChangeEvent, MouseEventHandler, ReactElement, useState } from "react";
import { ArrowDown, Plus, Search, MoreHorizontal, File } from "lucide-react";

import type { GenericTableHeader, ITableOptionsHProps } from "@/types";

type TableButtonProps = {
  Title?: string;
  action?: MouseEventHandler<HTMLButtonElement>;
  load?: boolean;
  Icon?: ReactElement;
  add?: MouseEventHandler<HTMLButtonElement>;
  exportFile?: MouseEventHandler<HTMLButtonElement>;
};

function OptionButton({ Title, action, Icon, load }: TableButtonProps) {
  const loading = `text-white btn btn-sm btn-success ${load ? "loading" : ""} rounded-md`;
  return (
    <button className={loading} onClick={action}>
      {Title}
      {Icon}
    </button>
  );
}

function OptionSelectorButton({ add, exportFile }: TableButtonProps) {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="flex items-center text-center text-white rounded-md btn btn-sm btn-success"
      >
        <MoreHorizontal size={18} className="pl-1" />
      </label>
      <ul tabIndex={0} className="p-2 shadow dropdown-content menu rounded-xl w-52 bg-base-200">
        {add && (
          <li>
            <button onClick={add}>
              <Plus size={15} />
              Add from File
            </button>
          </li>
        )}

        {exportFile && (
          <li>
            <button onClick={exportFile}>
              <File size={15} />
              Export Data
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function TableOptionHeader<T>({
  tableHead,
  filter,
  isFetching,
  refetch,
  Add,
  addFile,
  exportFile,
}: ITableOptionsHProps<T>): ReactElement {
  const [searchFilter, setSearchFilter] = useState(tableHead[0] as GenericTableHeader<T>);
  const [searchWord, setSearchWord] = useState("Ts" as string);

  function changeSelect({ target: { value } }: ChangeEvent<HTMLSelectElement>) {
    setSearchFilter(tableHead.filter((x) => x.name === value)[0] as GenericTableHeader<any>);
  }

  return (
    <div className="flex flex-col justify-between pt-4 pb-2 my-2 sm:flex-row">
      {/* Initial options  */}
      <div className="flex flex-row mb-1 sm:mb-0">
        {/* Select filter */}
        <div className="relative">
          <select
            value={searchFilter.name}
            className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-full rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
            onChange={changeSelect}
          >
            {tableHead.map((x, i) => (
              <option key={x.name + i} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <ArrowDown size={20} />
          </div>
        </div>

        {/* Search filter */}
        <div className="relative">
          <input
            placeholder="Search"
            className="block w-full py-2 pl-2 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-400 appearance-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            onChange={({ target: { value } }) => setSearchWord(value)}
            onKeyDown={(e) => e.key === "Enter" && filter && filter(searchFilter, searchWord)}
            max={25}
          />
        </div>
        {/* Search button */}
        <div className="relative">
          <button
            onClick={() => filter && filter(searchFilter, searchWord)}
            className="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-full rounded-l appearance-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          >
            <span className="absolute inset-y-0 left-0 flex items-center h-full pl-2">
              <Search size={15} />
            </span>
            Search
          </button>
        </div>
      </div>

      {/* Final Options */}
      <div className="relative flex pt-[2px] gap-2">
        <OptionButton Title="Refetch" action={refetch} load={isFetching} />
        {Add && (
          <OptionButton Title="Add" Icon={<Plus size={18} className="pl-1" />} action={Add} />
        )}
        {(addFile || exportFile) && <OptionSelectorButton add={addFile} exportFile={exportFile} />}
      </div>
    </div>
  );
}
