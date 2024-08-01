import type { Meta, StoryObj } from '@storybook/react';
import ImageandText, { ImageandTextProps } from '@/components/shared/common/ImageAndText';

const meta: Meta<typeof ImageandText> = {
title: "Components/ImageandText",
component: ImageandText,
argTypes: {
  imageSrc: { control: "text" },
  altText: { control: "text" },
  title: { control: "text" },
  description: { control: "text" },
  imagePosition: {
    control: {
      type: "select",
      options: ["left", "right"],
    },
  },
  className: { control: "text" },
  useIconImage: { control: "boolean" },
  primaryActionText: { control: "text" },
  secondaryActionText: { control: "text" },
},
parameters: {
  docs: {
    description: {
      component: `
      The ImageandText component is used to display an image or icon alongside text content.
      **Image and Text:**
      \`\`\`jsx
      import {ImageandText} from './ImageandText';

      <ImageandText title="Left Side"  imagePosition="left" >
            <p>Content goes here</p>
          </ImageandText>
      \`\`\`
      **Text and Image:**
      \`\`\`jsx
      import {ImageandText} from './ImageandText';

      <ImageandText title="Right Side"  imagePosition="right" >
            <p>Content goes here</p>
          </ImageandText>
      \`\`\`
      `,
    },
  },
},
};
export default meta;

type Story = StoryObj<ImageandTextProps>;

export const ImageAndText: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/150',
    altText: 'Placeholder Image',
    title: 'Sample Title',
    description: 'This is a sample description for the ImageandText component.',
    imagePosition: 'left',
    useIconImage: false,
    primaryActionText: 'Primary Action',
    secondaryActionText: 'Secondary Action',
  },
};

export const TextAndImage: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/150',
    altText: 'Placeholder Image',
    title: 'Sample Title',
    description: 'This is a sample description for the ImageandText component.',
    imagePosition: 'right',
    useIconImage: false,
    primaryActionText: 'Primary Action',
    secondaryActionText: 'Secondary Action',
  },
};