import type { Meta, StoryObj } from '@storybook/react-vite';

import { CardMedia } from '@/components/composites/card-media';

const meta: Meta<typeof CardMedia> = {
  title: 'Composites/CardMedia',
  component: CardMedia,
  decorators: [
    (Story) => (
      <div className="w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardMedia>;

export const Image: Story = {
  args: {
    type: 'image',
    src: '/bee-specimen.jpg',
    alt: 'Bee specimen',
  },
};

export const Confirmation: Story = {
  args: {
    type: 'confirmation',
    submittedName: 'Queen Sting',
  },
  decorators: [
    (Story) => (
      <div className="bg-[#282824] w-[336px] p-3">
        <Story />
      </div>
    ),
  ],
};

export const Winner: Story = {
  args: {
    type: 'winner',
    winnerName: 'Empress Honeydew',
    votes: 12,
  },
};
