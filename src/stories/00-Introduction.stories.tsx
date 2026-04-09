import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorybookIntroPage } from '@/components/intro/storybook-intro-page';

const meta = {
  title: 'Introduction/Overview',
  component: StorybookIntroPage,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    a11y: {
      disable: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StorybookIntroPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
