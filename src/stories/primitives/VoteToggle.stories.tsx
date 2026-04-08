import type { Meta, StoryObj } from '@storybook/react-vite';

import { VoteToggle } from '@/components/primitives/vote-toggle';

const meta: Meta<typeof VoteToggle> = {
  title: 'Primitives/VoteToggle',
  component: VoteToggle,
  decorators: [
    (Story) => (
      <div className="bg-[#282824] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VoteToggle>;

export const Default: Story = {
  args: {
    votes: 12,
    voted: false,
  },
};

export const Voted: Story = {
  args: {
    votes: 10,
    voted: true,
  },
};

export const Disabled: Story = {
  args: {
    votes: 3,
    voted: false,
    disabled: true,
  },
};
