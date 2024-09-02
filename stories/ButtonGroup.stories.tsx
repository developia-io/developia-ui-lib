import { Meta, StoryObj } from "@storybook/react";
import ButtonGroup, { ButtonGroupProps } from "@/components/shared/common/buttonGroup/ButtonGroup";
import RadioButtonGroup from "@/components/shared/common/buttonGroup/RadioButtonGroup"; 
import CheckboxButtonGroup from "@/components/shared/common/buttonGroup/CheckboxButtonGroup"; 


const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button Group",
  component: ButtonGroup,
  subcomponents: { RadioButtonGroup, CheckboxButtonGroup },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["filled",  "outlined", "text", "link"],
    }, 
    colorvariant: {
      control: "radio",
      options: ["primary", "secondary", "custom"],
    },
    customBgColor: {
      control: {type: 'color' },
    },
    customBorderColor: {
      control: "color",
    },
    customTextColor: {
      control: {type: 'color' },
    },
    radius: {
      control: "radio",
      options: ["square", "rounded"],
    },
    buttons: {
      control: "array",
      defaultValue: ["Button", "Button"],
    },
    spacing: {
      control: "select",
      options: ["space-0", "space-1", "space-2", "space-4"], 
    },
    prevIcon: {
      control: "object",
    },
    nextIcon: {
      control: "object",
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
  spacing: "space-1",
  buttons: ["Filled", "Filled"], 
};

// Outlined
export const Outlined: StoryObj<ButtonGroupProps> = Template.bind({});
Outlined.args = {
  orientation: "horizontal",
  variant: "outlined",
  colorvariant: "primary",
  radius: "rounded",
  spacing: "space-1",
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

// CustomColor
export const CustomColor: StoryObj<ButtonGroupProps> = Template.bind({});
CustomColor.args = {
  orientation: "horizontal",
  variant: "filled",
  colorvariant: "custom",
  radius: "rounded",
  spacing: "space-1",
  buttons: ["Custom", "Custom"], 
  customBgColor: "lightGray",
  customBorderColor: "darkGray"
};


// Radio
export const RadioGroup: StoryObj<ButtonGroupProps> = (args) => (
  <RadioButtonGroup {...args} />
);
RadioGroup.args = {
  orientation: "vertical",
  buttons: ["Option 1", "Option 2", "Option 3"],
  colorvariant: "custom",
};
RadioGroup.argTypes = {
  variant: { table: { disable: true } },
  customBgColor: { table: { disable: true } },
  customBorderColor: { table: { disable: true } },
  prevIcon: { table: { disable: true}},
  nextIcon: { table: { disable: true}},
  spacing:  { table: { disable: true}},
  radius:  { table: { disable: true}},
  size: { table: { disable:true}}
};

// Checkbox
export const CheckboxGroup: StoryObj<ButtonGroupProps> = (args) => (
  <CheckboxButtonGroup {...args} />
);
CheckboxGroup.args = {
  orientation: "vertical",
  buttons: ["Checkbox 1", "Checkbox 2", "Checkbox 3"],
};
CheckboxGroup.argTypes = {
  variant: { table: { disable: true } },
  customBgColor: { table: { disable: true } },
  customBorderColor: { table: { disable: true } },
  prevIcon: { table: { disable: true}},
  nextIcon: { table: { disable: true}},
  spacing:  { table: { disable: true}},
  radius:  { table: { disable: true}},
  size: { table: { disable:true}}
};
