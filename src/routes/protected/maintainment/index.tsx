import { useEffect, type ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { MaintenanceTable, PageWrapper } from "@/components";
import { chunkData } from "@/utils";
import { useModal } from "@/hooks";
import { SelectMaintenance } from "@/api";

import type { GenericTableHeader } from "@/types";

const baseUser: any = {
  id_number: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: 0,
};

const tableHeader: GenericTableHeader<any>[] = [
  { name: "Id", obj_val: "id_number" },
  { name: "Email", obj_val: "email" },
  { name: "Role Name", obj_val: "role" },
];

export default function MaintenmentPage(): ReactElement {
  // Hooks
  const {
    data: content,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery(["Mantinance-Users"], SelectMaintenance, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { modalOpen, handle } = useModal();

  const [users, setUsers] = useState([] as Array<any>);
  const [baseUsers, setBaseUsers] = useState([] as Array<any>);
  const [chunkedUsers, setChunkedUsers] = useState([] as Array<Array<any>>);
  const [chunkIndex, setChunkIndex] = useState(0 as number);
  const [onTouchForm, setOnTouchForm] = useState(baseUser as any);

  async function fetchInventoryData(data?: string | Array<any>) {
    if (data !== undefined && typeof data !== "string") {
      const chunkedData = chunkData(data);
      setBaseUsers(data);
      setUsers(chunkedData[chunkIndex]);
      setChunkedUsers(chunkedData);
    } else {
      data !== undefined && toast.error(`Error calling data : ${data}`);
    }
  }

  function filter(key: GenericTableHeader<any>, value: string) {
    const filteredRows = baseUsers.filter((x) =>
      x[key.obj_val]?.toString().toLocaleLowerCase().includes(value.toLowerCase())
    );
    setChunkedUsers((_) => {
      const chunkedReturn = chunkData(filteredRows);
      setUsers(chunkedReturn[0]);
      setChunkIndex(0);
      return chunkedReturn;
    });
  }

  function next() {
    chunkIndex < chunkedUsers.length - 1 &&
      setChunkIndex((ci) => {
        setUsers(chunkedUsers[ci + 1]);
        return ci + 1;
      });
  }

  function prev() {
    (chunkIndex !== 0 || chunkIndex > 0) &&
      setChunkIndex((ci) => {
        setUsers(chunkedUsers[ci - 1]);
        return ci - 1;
      });
  }

  // function preHandle() {
  //   setOnTouchForm(baseUser);
  //   handle();
  // }

  /** Interactive Form Functions */
  // function modifyForm(name: string, value: string | number) {
  //   setOnTouchForm({ ...onTouchForm, [name]: value });
  // }

  // function handleAdd() {
  //   console.log(onTouchForm.id_number);
  //   onTouchForm.email ? CreateUser(onTouchForm) : UpdateUser(onTouchForm);
  //   setOnTouchForm(baseUser);
  //   // handle();
  // }

  function edit(id: string) {
    setOnTouchForm(baseUsers.filter((x) => x.email === id)[0]);

    // console.log(baseRoles.filter((x) => x.id === id));

    // CreateRol(onTouchForm);
    handle();
  }

  function kill(id: string) {
    // DeleteUser(id);
    setChunkedUsers((_) => {
      const filteredRows = baseUsers.filter((x) => x.email !== id);
      const chunkedReturn = chunkData(filteredRows);
      setUsers(chunkedReturn[0]);
      setChunkIndex(0);
      setBaseUsers(filteredRows);
      return chunkedReturn;
    });
  }

  function jumpTo(page: number) {
    if (page <= 0 || page > chunkedUsers.length) {
      toast.error(`The page ${page} doesnt exits`);
      return;
    }
    const index = page - 1;
    setUsers(chunkedUsers[index]);
    setChunkIndex(index);
  }

  /** Interactive Form Functions */

  useEffect(() => {
    fetchInventoryData(content as any);
  }, [content]);

  return (
    <PageWrapper>
      <MaintenanceTable<{ firstname: string }>
        tableData={users}
        tableHead={tableHeader}
        Add={handle}
        refetch={() => refetch()}
        filter={filter}
        actSlice={chunkIndex + 1}
        edit={edit}
        kill={kill}
        next={next}
        prev={prev}
        jump={jumpTo}
        maxLength={chunkedUsers.length}
        isFetching={isLoading || isRefetching}
      />
    </PageWrapper>
  );
}
