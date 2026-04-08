import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  args: {
    placeholder: 'Suggest a royal name...',
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'Queen Sting',
  },
};

export const Error: Story = {
  args: {
    className: 'border-destructive',
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-1 w-[320px]">
        <Story />
        <p className="text-sm text-destructive">Please enter a name</p>
      </div>
    ),
  ],
};
