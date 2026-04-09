import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpacingRadiusDisplay, type TokenGroup } from '@/components/foundations/spacing-radius-display';

const meta = {
  title: 'Foundations/Layout Tokens',
  component: SpacingRadiusDisplay,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    a11y: {
      disable: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacingRadiusDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

const layoutTokens: TokenGroup[] = [
  {
    label: 'Spacing',
    tokens: [
      { name: 'spacing/0', value: '0' },
      { name: 'spacing/4', value: '4' },
      { name: 'spacing/8', value: '8' },
      { name: 'spacing/12', value: '12' },
      { name: 'spacing/16', value: '16' },
      { name: 'spacing/20', value: '20' },
      { name: 'spacing/24', value: '24' },
      { name: 'spacing/32', value: '32' },
      { name: 'spacing/40', value: '40' },
      { name: 'spacing/48', value: '48' },
      { name: 'spacing/64', value: '64' },
      { name: 'spacing/80', value: '80' },
      { name: 'spacing/96', value: '96' },
    ],
  },
  {
    label: 'Radius',
    tokens: [
      { name: 'radius/0', value: '0' },
      { name: 'radius/8', value: '8' },
      { name: 'radius/12', value: '12' },
      { name: 'radius/16', value: '16' },
      { name: 'radius/20', value: '20' },
      { name: 'radius/24', value: '24' },
      { name: 'radius/32', value: '32' },
      { name: 'radius/full', value: '999' },
    ],
  },
  {
    label: 'Containers',
    tokens: [
      { name: 'container/modal', value: '560' },
      { name: 'container/mobile', value: '375' },
      { name: 'container/desktop-content', value: '1200' },
    ],
  },
];

export const LayoutTokens: Story = {
  args: {
    groups: layoutTokens,
  },
  render: (args) => (
    <div className="min-h-screen bg-[#f8f8f3] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
            Foundations
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl text-[#3e1915]">
            Layout Tokens
          </h1>
          <p className="text-base leading-7 text-[#533d32] sm:text-lg">
            Spacing, border radius, and container sizes that define the layout
            system for Alveole. These tokens ensure consistent rhythm and
            proportions across all components and screens.
          </p>
        </div>
        <SpacingRadiusDisplay {...args} />
      </div>
    </div>
  ),
};
