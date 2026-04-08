import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: {
    children: 'Continue',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const BrandYellow: Story = {
  args: {
    children: 'Continue →',
    className:
      'bg-brand-yellow text-foreground-accent rounded-[2px] h-12 w-full text-lg font-medium hover:bg-brand-yellow/90',
  },
};

export const BrandYellowDisabled: Story = {
  args: {
    ...BrandYellow.args,
    className:
      'bg-brand-yellow text-foreground-accent rounded-[2px] h-12 w-full text-lg font-medium opacity-50',
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'View submitted names',
    className: 'text-base font-medium',
  },
};
