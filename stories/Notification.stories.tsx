// src/stories/Notification.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Notification, {
  NotificationProps,
} from "@/components/shared/common/Notification";

const meta: Meta<NotificationProps> = {
  title: "Components/Notification",
  component: Notification,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["success", "error", "info", "warning"],
      },
    },
    customColor: {
      control: "color",
    },
    position: {
      control: {
        type: "select",
        options: ["top-left", "top-right", "bottom-left", "bottom-right"],
      },
    },
    duration: {
      control: "number",
    },
    showCloseButton: {
      control: "boolean",
    },
    styleType: {
      control: {
        type: "select",
        options: ["filled", "outlined", "transparent"],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
          The Notification component is used to display various types of notifications.

          **Example Usage:**
          \`\`\`jsx
          import { Notification } from './Notification';

          <Notification
            id="1"
            message="This is a success notification"
            type="success"
            position="top-right"
            duration={5000}
            showCloseButton={true}
            styleType="filled"
          />
          \`\`\`
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<NotificationProps>;

export const Success: Story = {
  args: {
    id: "1",
    message: "This is a success notification",
    type: "success",
    position: "top-right",
    duration: 5000,
    // showCloseButton: true,
    styleType: "filled",
  },
};

export const Error: Story = {
  args: {
    id: "2",
    message: "This is an error notification",
    type: "error",
    position: "top-right",
    duration: 5000,
    showCloseButton: true,
    styleType: "filled",
  },
};

export const Info: Story = {
  args: {
    id: "3",
    message: "This is an info notification",
    type: "info",
    position: "top-right",
    duration: 5000,
    showCloseButton: true,
    styleType: "filled",
  },
};

export const Warning: Story = {
  args: {
    id: "4",
    message: "This is a warning notification",
    type: "warning",
    position: "top-right",
    duration: 5000,
    showCloseButton: true,
    styleType: "filled",
  },
};

export const CustomColor: Story = {
  args: {
    id: "5",
    message: "This is a custom color notification",
    type: "info",
    customColor: "#ff00ff",
    position: "top-right",
    duration: 5000,
    showCloseButton: true,
    styleType: "filled",
  },
};

export const WithoutCloseButton: Story = {
  args: {
    id: "6",
    message: "This notification has no close button",
    type: "info",
    position: "top-right",
    duration: 5000,
    showCloseButton: false,
    styleType: "filled",
  },
};

export const Outlined: Story = {
  args: {
    id: "7",
    message: "This is an outlined notification",
    type: "info",
    position: "top-right",
    duration: 5000,
    showCloseButton: true,
    styleType: "outlined",
  },
};

export const Transparent: Story = {
  args: {
    id: "8",
    message: "This is a transparent notification",
    type: "info",
    position: "top-right",
    duration: 5000,
    showCloseButton: true,
    styleType: "transparent",
  },
};
