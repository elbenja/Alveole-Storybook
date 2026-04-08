import type { Meta, StoryObj } from '@storybook/react-vite';

import celebrationAnimation from '@/assets/lottie/celebration.json';
import cloudsAnimation from '@/assets/lottie/clouds.json';
import { LottieBackground } from '@/components/primitives/lottie-background';

const meta: Meta<typeof LottieBackground> = {
  title: 'Primitives/LottieBackground',
  component: LottieBackground,
  decorators: [
    (Story) => (
      <div className="relative w-[336px] h-[252px] overflow-hidden rounded-xl bg-gradient-to-b from-[var(--algray-200)] to-[var(--algray-50)]">
        <Story />
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="text-2xl font-light text-foreground-accent">
            Content on top
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LottieBackground>;

export const Clouds: Story = {
  args: {
    animationData: cloudsAnimation,
    hoverToPlay: true,
  },
};

export const Celebration: Story = {
  args: {
    animationData: celebrationAnimation,
    blendMode: 'screen',
  },
};
