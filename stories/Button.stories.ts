// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "@/components/shared/common/buttons/Button";
import { IImage } from "@/components/interface";
import IconAngleLeft from "../public/IconAngleLeft.svg";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary", "text", "outlined", "link"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["primary", "secondary"],
      },
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    prevIcon: {
      control: {
        type: "object",
      },
    },
    nextIcon: {
      control: {
        type: "object",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    color: "secondary",
  },
};

export const Text: Story = {
  args: {
    children: "Text Button",
    variant: "text",
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    variant: "primary",
    loading: true,
  },
};

// Örnek bir ikon tanımlaması
const exampleIcon: IImage = {
  src: IconAngleLeft,
  alt: "Example Icon",
  width: 16,
  height: 16,
};

export const WithPrevIcon: Story = {
  args: {
    children: "Button with Prev Icon",
    variant: "primary",
    prevIcon: exampleIcon,
  },
};

export const WithNextIcon: Story = {
  args: {
    children: "Button with Next Icon",
    variant: "primary",
    nextIcon: exampleIcon,
  },
};
