"use client";
import Button from "@/components/shared/common/buttons/Button";
import IconButton from "@/components/shared/common/buttons/IconButton";
import Input from "@/components/shared/common/inputs/Input";
import TextArea from "@/components/shared/common/inputs/TextArea";
import { IconTest2 } from "@/components/icons";
import RadioButton from "@/components/shared/common/buttons/RadioButton";
import { useState } from "react";
import Pagination from "@/components/shared/common/Pagination";
import Spinner from "@/components/shared/common/Spinner";
import NavList, { Orientation } from "@/components/shared/common/NavList";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
      <Pagination
        currentPage={currentPage}
        onChangePage={() => setCurrentPage(currentPage + 1)}
        rowCount={10}
        rowsPerPage={10}
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
      />{" "}
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
    </main>
  );
}
