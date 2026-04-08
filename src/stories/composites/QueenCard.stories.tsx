import type { Meta, StoryObj } from '@storybook/react-vite';

import { QueenCard } from '@/components/composites/queen-card';

const meta: Meta<typeof QueenCard> = {
  title: 'Composites/QueenCard',
  component: QueenCard,
  decorators: [
    (Story) => (
      <div className="w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QueenCard>;

export const Light: Story = {
  args: {
    variant: 'light',
    children: (
      <div className="p-8 text-center text-foreground">Light card content</div>
    ),
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <div className="p-8 text-center text-[#f8f8f3]">Dark card content</div>
    ),
  },
};
