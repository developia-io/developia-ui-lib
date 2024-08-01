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
import Stepper from "@/components/shared/common/Stepper";
import Header from "@/components/shared/common/Header";
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
import Breadcrumb from "@/components/shared/common/Breadcrumb";
import Checkbox from "@/components/shared/common/inputs/Checkbox";
import ImageandText from "@/components/shared/common/ImageAndText";
import SearchBar from "@/components/shared/common/SearchBar";

export default function Home() {
  const [checked, setChecked] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckboxChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked1(event.target.checked);
  };

  const handleCheckboxChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked2(event.target.checked);
  };
  <Checkbox></Checkbox>
  const breadcrumbItems = [
    { title: 'Home', url: '/' },
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Settings', noTranslate: true },
  ];
  const steps = [
    { title: 'Adım 1', subtitle: 'Alt başlık 1' },
    { title: 'Adım 2', subtitle: 'Alt başlık 2' },
    { title: 'Adım 3' }
  ];
  const dropdownItems = [
    { name: "Item 1", link: "/item1" },
    { name: "Item 2", link: "/item2" },
    { name: "Item 3", link: "/item3" },
  ];
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
  const navList = (
  <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
      <li><a href="/" className="text-neutral_80 hover:text-neutral_100">Home</a></li>
      <li><a href="/about" className="text-neutral_80 hover:text-neutral_100">About</a></li>
      <li><a href="/contact" className="text-neutral_80 hover:text-neutral_100">Contact</a></li>
    </ul>
  );

  const actions = (
    <button className="px-4 py-2 bg-primary_60 text-helper_White rounded-md">Sign In</button>
  );

  return (
    <main className="flex min-h-screen flex-col  gap-8 p-24">

<Header 
        navList={navList} 
        actions={actions} 
        logoPosition="left"
      />
      <Breadcrumb items={breadcrumbItems} />
      <SearchBar radius="rounded" />
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
      
      <Checkbox
        label="Accept Terms"
        checked={isChecked1}
        onChange={handleCheckboxChange1}
      />
      <Checkbox
        label="Disabled Option"
        checked={isChecked2}
        onChange={handleCheckboxChange2}
        disabled
      />
    
      
      <Stepper steps={steps} activeIndex={2} />
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
      
<ImageandText
        title="SVG Icon Example"
        description="Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viperra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo eleifend ultricies purus aculis."
        primaryActionText="Primary Action"
        secondaryActionText="Secondary Action"
        imagePosition="left"
        className="my-custom-class"
        useIconImage={true}
      />
    </main>
  );
}
