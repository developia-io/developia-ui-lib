import { Meta, StoryObj } from "@storybook/react";
import ButtonGroup, { ButtonGroupProps } from "@/components/shared/common/buttonGroup/ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button Group",
  component: ButtonGroup,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["filled", "text", "outlined", "link"],
    },
    colorvariant: {
      control: "radio",
      options: ["primary", "secondary", "custom"],
    },
    customBgColor: {
      control: "color",
    },
    customBorderColor: {
      control: "color",
    },
    customTextColor: {
      control: "color",
    },
    radius: {
      control: "select",
      options: ["square", "rounded"],
    },
    buttons: {
      control: "array",
      defaultValue: ["Button 1", "Button 2"],
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A group of buttons with customizable orientation, spacing, variant, and colors.",
      },
    },
  },
};

export default meta;

// Template for stories
const Template: StoryObj<ButtonGroupProps> = (args: ButtonGroupProps) => (
  <ButtonGroup {...args} />
);

// Filled
export const Filled: StoryObj<ButtonGroupProps> = Template.bind({});
Filled.args = {
  orientation: "horizontal",
  variant: "filled",
  colorvariant: "primary",
  radius: "rounded",
  spacing: "space-x-1",
  buttons: ["Filled", "Filled"], 
};

// Outlined
export const Outlined: StoryObj<ButtonGroupProps> = Template.bind({});
Outlined.args = {
  orientation: "horizontal",
  variant: "outlined",
  colorvariant: "primary",
  radius: "rounded",
  spacing: "space-x-1",
  buttons: ["Outlined", "Outlined"], 
};

// Text
export const Text: StoryObj<ButtonGroupProps> = Template.bind({});
Text.args = {
  orientation: "horizontal",
  variant: "text",
  colorvariant: "primary",
  buttons: ["Text", "Text"], 
};

// Link
export const Link: StoryObj<ButtonGroupProps> = Template.bind({});
Link.args = {
  orientation: "horizontal",
  variant: "link",
  colorvariant: "primary",
  buttons: ["Link", "Link"], 
};
