// src/stories/Card.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card, { CardProps } from "@/components/shared/common/Card";
import Button from "@/components/shared/common/buttons/Button";

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: { control: "text" },
    imageSrc: { control: "text" },
    paragraph: { control: "text" },
    variant: {
      control: {
        type: "radio",
        options: ["outlined", "filled"],
      },
    },
    radius: {
      control: {
        type: "radio",
        options: ["rounded", "square"],
      },
    },
    color: {
      control: {
        type: "radio",
        options: ["primary", "secondary", "transparent", "custom"],
      },
    },
    customClass: { control: "text" },
    customBorderColor: { control: "text" },
    customBgColor: { control: "text" },
    customTextColor: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component: `
          The Card component is a flexible container for various types of content.

          **Outlined Card:**
          \`\`\`jsx
          import { Card } from './Card';

          <Card title="Outlined Card" variant="outlined" radius="rounded">
            <p>Content goes here</p>
          </Card>
          \`\`\`

          **Filled Card:**
          \`\`\`jsx
          import { Card } from './Card';

          <Card title="Filled Card" variant="filled" radius="rounded">
            <p>Content goes here</p>
          </Card>
          \`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<CardProps>;

export const CustomContent: Story = {
  args: {
    title: "Custom Content Card",
    paragraph: "This card has custom content.",
    variant: "outlined",
    radius: "rounded",
    customClass: "flex flex-col",
    customTextColor: "text-green-700",
  },
  render: (args) => (
    <Card {...args}>
      <div>
        <p>Custom paragraph inside card.</p>
        <Button variant="primary" color="primary">
          Custom Button
        </Button>
      </div>
    </Card>
  ),
};

export const FilledSquare: Story = {
  args: {
    title: "Filled and Square",
    paragraph: "This is a filled and square card.",
    variant: "filled",
    radius: "square",
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Image",
    imageSrc: "https://via.placeholder.com/150",
    paragraph: "This card has an image.",
    variant: "outlined",
    radius: "rounded",
  },
};

export const CustomClass: Story = {
  args: {
    title: "Card with Custom Class",
    paragraph: "This card uses a custom class.",
    customClass: "bg-blue-100 border border-blue-300 text-blue-700",
  },
};

export const AllProps: Story = {
  args: {
    title: "All Props Example",
    imageSrc: "https://via.placeholder.com/150",
    paragraph: "This card demonstrates all props.",
    variant: "filled",
    radius: "square",
    customClass: "text-center",
    customBgColor: "bg-green-100",
    customBorderColor: "border-green-500",
    customTextColor: "text-green-800",
  },
  render: (args) => (
    <Card {...args}>
      <div className="flex flex-col items-center gap-4">
        <p>Custom content here</p>
        <Button variant="primary" color="primary">
          Action
        </Button>
      </div>
    </Card>
  ),
};

export const HorizontalLayout: Story = {
  args: {
    title: "Horizontal Layout",
    paragraph: "This card uses a horizontal flex layout.",
    variant: "outlined",
    radius: "rounded",
    customClass: "flex-row justify-between max-w-[700px]",
  },
  render: (args) => (
    <Card {...args}>
      <div className="flex flex-col justify-between">
        <div className="flex-grow">
          <p>Left side content</p>
        </div>
        <div className="flex-shrink">
          <Button variant="primary" color="primary">
            Button
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const VerticalLayout: Story = {
  args: {
    title: "Vertical Layout",
    paragraph: "This card uses a vertical flex layout.",
    variant: "filled",
    radius: "rounded",
    customClass: "flex-col",
  },
  render: (args) => (
    <Card {...args}>
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <p>Top content</p>
        </div>
        <div>
          <Button variant="primary" color="primary">
            Button
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const Outlined: Story = {
  args: {
    title: "Outlined Card",
    paragraph: "This is an outlined card.",
    variant: "outlined",
    radius: "rounded",
  },
};

export const Transparent: Story = {
  args: {
    title: "Transparent Card",
    paragraph: "This card has a transparent background and no border.",
    variant: "outlined",
    radius: "rounded",
    color: "transparent",
  },
  render: (args) => (
    <Card {...args}>
      <div>
        <p>Transparent cards are useful for overlay content.</p>
        <Button variant="primary" color="primary">
          Action
        </Button>
      </div>
    </Card>
  ),
};

export const TransparentWithImage: Story = {
  args: {
    title: "Transparent Card with Image",
    imageSrc: "https://via.placeholder.com/150",
    paragraph: "This card has a transparent background and an image.",
    variant: "outlined",
    radius: "rounded",
    color: "transparent",
  },
};
