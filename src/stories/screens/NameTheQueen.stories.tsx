import type { Meta, StoryObj } from '@storybook/react-vite';

import { NameTheQueen } from '@/components/screens/name-the-queen';

const meta: Meta<typeof NameTheQueen> = {
  title: 'Screens/NameTheQueen',
  component: NameTheQueen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen p-6 bg-[#e8e8dd]">
        <div className="w-[336px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NameTheQueen>;

export const InputStep: Story = {
  args: {
    initialStep: 'INPUT',
  },
};

export const SubmittedStep: Story = {
  args: {
    initialStep: 'SUBMITTED',
  },
};

export const VotingStep: Story = {
  args: {
    initialStep: 'VOTING',
  },
};

export const WinnerStep: Story = {
  args: {
    initialStep: 'WINNER',
  },
};

export const FullFlow: Story = {
  args: {
    initialStep: 'INPUT',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive flow — type a name, submit, vote on suggestions, and reveal the winner.',
      },
    },
  },
};
