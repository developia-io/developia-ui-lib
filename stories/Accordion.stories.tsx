import type { Meta, StoryObj } from "@storybook/react";
import Accordion, { AccordionProps } from "@/components/shared/common/Accordion";
import { FaAndroid, FaBeer, FaChevronDown, FaChevronUp } from "react-icons/fa";

const meta: Meta<AccordionProps> = {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    allowMultipleOpen: { control: "boolean" },
    customClass: { control: "text" },
    items: { control: "object" },
  },
  parameters: {
    docs: {
      description: {
        component: `
          The Accordion component displays collapsible content panels.

          **Default Accordion:**
          \`\`\`jsx
          import { Accordion } from './Accordion';

          <Accordion items={[
            { title: "Item 1", content: "Content 1" },
            { title: "Item 2", content: "Content 2" },
          ]} />
          \`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<AccordionProps>;

export const DefaultAccordion: Story = {
  args: {
    items: [
      { title: "Item 1", content: "This is the content of item 1." },
      { title: "Item 2", content: "This is the content of item 2." },
    ],
  },
};

export const MultipleOpenAllowed: Story = {
  args: {
    items: [
      { title: "Item 1", content: "This is the content of item 1." },
      { title: "Item 2", content: "This is the content of item 2." },
    ],
    allowMultipleOpen: true,
  },
};

export const CustomAccordionClass: Story = {
  args: {
    items: [
      { title: "Styled Accordion 1", content: "This accordion has custom styles." },
      { title: "Styled Accordion 2", content: "Another item with custom styles." },
    ],
    customClass: "bg-yellow-100 p-4 border border-red-300 rounded-md",
  },
};

export const IconAccordionClass: Story = {
    args: {
      items: [
        { 
            title: "Styled Accordion 1", 
            content: "This accordion has custom styles.", 
            openIcon: <FaChevronUp />, 
            closedIcon: <FaChevronDown /> 
        },
        { 
            title: "Styled Accordion 1", 
            content: "This accordion has custom styles.", 
            openIcon: <FaBeer />, 
            closedIcon: <FaAndroid />
        }
      ]
    },
  };

export const CustomItemClass: Story = {
  args: {
    items: [
        {
            title:"Styled Item 1",
            content: "Styled content for item 1.",
            customClass: "border border-green-500 rounded-none",
            titleClass: "font-bold text-green-600 bg-green-100",
            contentClass: "text-gray-800 p-4 bg-green-50",
          },
          {
            title: "Styled Item 2",
            content: "Styled content for item 2.",
            customClass: "border-none",
            titleClass: "font-bold text-purple-600 bg-purple-100",
            contentClass: "text-gray-800 p-4 bg-purple-50",
          },
          {
            title: "Styled Item 2",
            content: "Styled content for item 2.",
            customClass: "border border-purple-500 rounded-3xl",
            titleClass: "font-bold text-purple-600 bg-purple-100",
            contentClass: "text-gray-800 p-4 bg-purple-50",
          },
          {
            title: "Styled Item 2",
            content: "Styled content for item 2.",
            customClass: "border border-yellow-500 rounded-lg",
            titleClass: "font-bold text-yellow-600 bg-yellow-100",
            contentClass: "text-gray-800 p-4 bg-yellow-50",
          },
    ]
  },
};

export const CustomItemAndAccordionClass: Story = {
  args: {
    items: [
      {
        title:"Styled Item 1",
        content: "Styled content for item 1.",
        customClass: "border border-green-500",
        titleClass: "font-bold text-green-600 bg-green-100",
        contentClass: "text-gray-800 p-4 bg-green-50",
      },
      {
        title: "Styled Item 2",
        content: "Styled content for item 2.",
        customClass: "border border-purple-500",
        titleClass: "font-bold text-purple-600 bg-purple-100",
        contentClass: "text-gray-800 p-4 bg-purple-50",
      },
    ],
    customClass: "bg-yellow-100 p-4 border border-red-300 rounded-md",
  },
};

export const WithLongContent: Story = {
  args: {
    items: [
      {
        title: "Item with Long Content",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus in lacus ornare malesuada. Etiam et sapien a massa dapibus convallis. Vivamus rutrum, leo eget molestie dapibus, dolor felis efficitur purus, sit amet ornare est ligula a enim. Phasellus semper felis est, at ullamcorper augue accumsan vitae. Phasellus varius consequat quam non consectetur. Sed pulvinar, sem ut vulputate ultrices, nibh risus mollis libero, sed dictum tellus ligula efficitur diam. Quisque ut lacus id massa suscipit facilisis placerat eget ipsum. Vivamus vestibulum varius sapien. Nulla convallis laoreet quam. Morbi a metus fringilla urna accumsan eleifend at vel ligula. Phasellus molestie enim quis imperdiet cursus. Pellentesque id condimentum erat. Vestibulum commodo lectus et blandit vehicula. Donec vitae erat tellus. Aliquam ullamcorper imperdiet metus eget pretium.",
      },
    ],
  },
};