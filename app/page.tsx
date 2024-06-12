"use client";
import Button from "@/components/shared/common/buttons/Button";
import Input from "@/components/shared/common/inputs/Input";
import TextArea from "@/components/shared/common/inputs/TextArea";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  gap-8 p-24">
      <Button variant="outlined" color="primary" children="test" />
      <Input
        onChange={() => console.log("a")}
        placeholder="test"
        required={true}
      />
      <TextArea placeholder="test" />
    </main>
  );
}
