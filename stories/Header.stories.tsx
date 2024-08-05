import type { Meta, StoryObj } from "@storybook/react";
import Header, { HeaderProps } from "@/components/shared/common/Header";
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const meta: Meta<HeaderProps> = {
  title: "Components/Header",
  component: Header,
  argTypes: {
    logoPosition: {
      control: {
        type: "select",
        options: ["left", "center", "right"],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
          The Header component is used for navigation and branding.

          **Header with logo on the left:**
          \`\`\`jsx
          import { Header } from './Header';

          <Header logoPosition="left" />
          \`\`\`

          **Header with logo in the center:**
          \`\`\`jsx
          import { Header } from './Header';

          <Header logoPosition="center" />
          \`\`\`

          **Header with logo on the right:**
          \`\`\`jsx
          import { Header } from './Header';

          <Header logoPosition="right" />
          \`\`\`
        `,
      },
    },
  },
};
export default meta;


type Story = StoryObj<HeaderProps>;

export const LogoLeft: Story = {
  args: {
    logoPosition: "left",
    logo: <img src="/logo.svg" alt="Logo" className="w-12 h-12" />,
    navList: (
      <>
        <a href="#home" className="text-neutral_80">Home</a>
        <a href="#about" className="text-neutral_80">About</a>
        <a href="#contact" className="text-neutral_80">Contact</a>
      </>
    ),
    actions: (
      <>
        <button className="text-neutral_80">Login</button>
        <button className="text-neutral_80">Register</button>
      </>
    ),
  },
};

export const LogoCenter: Story = {
  args: {
    logoPosition: "center",
    logo: <img src="/logo.svg" alt="Logo" className="w-12 h-12" />,
    navList: (
      <>
        <a href="#home" className="text-neutral_80">Home</a>
        <a href="#about" className="text-neutral_80">About</a>
        <a href="#contact" className="text-neutral_80">Contact</a>
      </>
    ),
    actions: (
      <>
        <button className="text-neutral_80">Login</button>
        <button className="text-neutral_80">Register</button>
      </>
    ),
  },
};

export const LogoRight: Story = {
  args: {
    logoPosition: "right",
    logo: <img src="/logo.svg" alt="Logo" className="w-12 h-12" />,
    navList: (
      <>
        <a href="#home" className="text-neutral_80">Home</a>
        <a href="#about" className="text-neutral_80">About</a>
        <a href="#contact" className="text-neutral_80">Contact</a>
      </>
    ),
    actions: (
      <>
        <button className="text-neutral_80">Login</button>
        <button className="text-neutral_80">Register</button>
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    logoPosition: "left",
    logo: <img src="/logo.svg" alt="Logo" className="w-12 h-12" />,
    navList: (
      <>
        <a href="#home" className="text-neutral_80">Home</a>
        <a href="#about" className="text-neutral_80">About</a>
        <a href="#contact" className="text-neutral_80">Contact</a>
      </>
    ),
    actions: (
      <>
        <button className="text-neutral_80"><FaHome /></button>
        <button className="text-neutral_80"><FaUser /></button>
        <button className="text-neutral_80"><FaCog /></button>
      </>
    ),
  },
};

export const MobileMenu: Story = {
  args: {
    logoPosition: "left",
    logo: <img src="/logo.svg" alt="Logo" className="w-12 h-12" />,
    navList: (
      <>
        <a href="#home" className="text-neutral_80">Home</a>
        <a href="#about" className="text-neutral_80">About</a>
        <a href="#contact" className="text-neutral_80">Contact</a>
      </>
    ),
    actions: (
      <>
        <button className="text-neutral_80">Login</button>
        <button className="text-neutral_80">Register</button>
      </>
    ),
  },
};