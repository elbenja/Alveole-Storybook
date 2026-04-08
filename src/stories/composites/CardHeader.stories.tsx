import {
  ChampionIcon,
  CheckmarkBadge04Icon,
  Crown02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import cloudsAnimation from '@/assets/lottie/clouds.json';
import { CardHeader } from '@/components/composites/card-header';

const meta: Meta<typeof CardHeader> = {
  title: 'Composites/CardHeader',
  component: CardHeader,
  decorators: [
    (Story) => (
      <div className="w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardHeader>;

export const InputStep: Story = {
  args: {
    icon: (
      <HugeiconsIcon
        icon={Crown02Icon}
        size={32}
        className="text-foreground-accent"
      />
    ),
    title: 'Name the Queen',
    subtitle: 'Our hive has a new queen - help us give her a royal name.',
    variant: 'light',
    lottieData: cloudsAnimation,
    lottieHoverToPlay: true,
  },
};

export const SubmittedStep: Story = {
  args: {
    icon: (
      <HugeiconsIcon
        icon={CheckmarkBadge04Icon}
        size={32}
        className="text-border-success"
      />
    ),
    title: 'Name Submitted!',
    subtitle: 'Your suggestion has been added to the hive.',
    variant: 'dark',
    iconBorderColor: '#059669',
  },
};

export const WinnerStep: Story = {
  args: {
    icon: (
      <HugeiconsIcon
        icon={ChampionIcon}
        size={32}
        className="text-foreground-accent"
      />
    ),
    title: 'All Hail the Queen',
    subtitle: "The hive has spoken. Our queen's name is...",
    variant: 'light',
  },
};
