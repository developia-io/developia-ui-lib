"use client";
import Button from "@/components/shared/common/buttons/Button";
import IconButton from "@/components/shared/common/buttons/IconButton";
import Input from "@/components/shared/common/inputs/Input";
import TextArea from "@/components/shared/common/inputs/TextArea";
import { IconTest2 } from "@/components/icons";
import RadioButton from "@/components/shared/common/buttons/RadioButton";
import { useEffect, useState } from "react";
import Pagination from "@/components/shared/common/Pagination";
import Spinner from "@/components/shared/common/Spinner";
import NavList from "@/components/shared/common/NavList";
import PaginatedTable from "@/components/shared/common/Table";
import Table from "@/components/shared/common/Table";
type ItemType = {
  name: string;
  email: string;
  phone: string;
  // Diğer veri tipleri buraya eklenebilir
};

export default function Home() {
  const [checked, setChecked] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ];

  const dataMock = [
    { name: "John Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "Jane Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "John Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "Jane Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "John Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "John Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "Jane Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
    { name: "John Doe", email: "JbNfj@example.com", phone: "123-456-7890" },
  ];
  const totalPagesMock = 10;

  const [data, setData] = useState<ItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  const fetchData = async (page: number) => {
    try {
      setData(dataMock);
      setTotalPages(totalPagesMock);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <main className="flex min-h-screen flex-col  gap-8 p-24">
      <Button variant="outlined" color="primary">
        Test
      </Button>
      <Input
        onChange={() => console.log("a")}
        placeholder="test"
        required={true}
      />
      <TextArea placeholder="test" />

      <RadioButton
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />

      <Spinner className="w-8 h-8" />
      <NavList
        items={[
          {
            title: { name: "test", link: "" },
            list: [
              { name: "test", link: "" },
              { name: "test", link: "" },
            ],
          },
          {
            title: { name: "test2", link: "" },
            list: [
              { name: "test2", link: "" },
              { name: "test2", link: "" },
            ],
          },
        ]}
        isHeaderNavList={true}
        isHeaderScrolled={false}
      />
      <Table
        columns={columns}
        data={data}
        totalPages={totalPages}
        currentPage={currentPage}
        rowsPerPage={8}
        onChangePage={(page) => setCurrentPage(page)}
      />
    </main>
  );
}
