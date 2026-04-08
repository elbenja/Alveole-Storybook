import type { Meta, StoryObj } from '@storybook/react-vite';

import { NameListItem } from '@/components/primitives/name-list-item';

const meta: Meta<typeof NameListItem> = {
  title: 'Primitives/NameListItem',
  component: NameListItem,
  decorators: [
    (Story) => (
      <div className="bg-[#282824] w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NameListItem>;

export const FirstPlace: Story = {
  args: {
    rank: 1,
    name: 'Empress Honeydew',
    votes: 12,
  },
};

export const RegularItem: Story = {
  args: {
    rank: 3,
    name: 'Lady Buzzworth',
    votes: 7,
  },
};

export const VotedItem: Story = {
  args: {
    rank: 2,
    name: 'Queen Cleopollen',
    votes: 10,
    voted: true,
  },
};
