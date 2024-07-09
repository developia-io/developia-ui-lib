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

import Table from "@/components/shared/common/Table";
type ItemType = {
  name: string;
  email: string;
  phone: string;
  // Diğer veri tipleri buraya eklenebilir
};
import NavList, { Orientation } from "@/components/shared/common/NavList";
import Datepicker from "@/components/shared/common/datepicker/Datepicker";
import Dropdown from "@/components/shared/common/Dropdown";

export default function Home() {
  const [checked, setChecked] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    { id: "name", label: "Name", sortable: true },
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
      setData(
        dataMock.map((item) => ({
          name: item.name + page.toString(),
          email: item.email,
          phone: item.phone,
        }))
      );
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
      <Button variant="outlined" colorvariant="primary" radius="rounded">
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

      <Table
        columns={columns}
        data={data}
        totalPages={totalPages}
        currentPage={currentPage}
        rowsPerPage={8}
        onChangePage={(page) => setCurrentPage(page)}
      />

      <div className="flex flex-row gap-16">
        <NavList
          items={[
            {
              title: { name: "Horizantal Nav List Test Title", link: "" },
              list: [
                { name: "Test", link: "" },
                { name: "Test 2", link: "" },
                { name: "Test 3", link: "" },
              ],
            },
          ]}
          orientation={Orientation.Horizantal}
        />
        <NavList
          items={[
            {
              title: { name: "Test 2", link: "" },
              list: [
                { name: "test", link: "" },
                { name: "test", link: "" },
                { name: "test", link: "" },
              ],
            },
          ]}
          orientation={Orientation.Horizantal}
        />
      </div>

      <Datepicker />
      <Dropdown
      title="Menu"
      items={[
        { name: "Item 1", link: "/item1" },
        { name: "Item 2", link: "/item2" },
      ]}
  radius="rounded" 
/>
    </main>
  );
}
