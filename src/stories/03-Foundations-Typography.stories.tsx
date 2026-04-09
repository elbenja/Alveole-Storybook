import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypographyDisplay, type TypographyCategory } from '@/components/foundations/typography-display';

const meta = {
  title: 'Foundations/Typography',
  component: TypographyDisplay,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    a11y: {
      disable: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

const typographyCategories: TypographyCategory[] = [
  {
    label: 'Headings',
    description: 'Titles use 110% line-height for optimal legibility on large text.',
    variants: [
      {
        name: 'h1',
        level: '48/48',
        weight: 'Light',
        size: '48px',
        lineHeight: '48px',
        sample: 'Ag',
      },
      {
        name: 'h2',
        level: '30/36',
        weight: 'Light',
        size: '30px',
        lineHeight: '36px',
        sample: 'Ag',
      },
      {
        name: 'h3',
        level: '24/32',
        weight: 'Light',
        size: '24px',
        lineHeight: '32px',
        sample: 'Ag',
      },
      {
        name: 'h4',
        level: '20/28',
        weight: 'Regular',
        size: '20px',
        lineHeight: '28px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-xs',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '12px',
        lineHeight: '16px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '12px',
        lineHeight: '16px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '12px',
        lineHeight: '16px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '12px',
        lineHeight: '16px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-sm',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '14px',
        lineHeight: '20px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '14px',
        lineHeight: '20px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '14px',
        lineHeight: '20px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '14px',
        lineHeight: '20px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-base',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '16px',
        lineHeight: '24px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '16px',
        lineHeight: '24px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '16px',
        lineHeight: '24px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '16px',
        lineHeight: '24px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-lg',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '18px',
        lineHeight: '28px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '18px',
        lineHeight: '28px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '18px',
        lineHeight: '28px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '18px',
        lineHeight: '28px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-xl',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '20px',
        lineHeight: '28px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '20px',
        lineHeight: '28px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '20px',
        lineHeight: '28px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '20px',
        lineHeight: '28px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-2xl',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '24px',
        lineHeight: '32px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '24px',
        lineHeight: '32px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '24px',
        lineHeight: '32px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '24px',
        lineHeight: '32px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-3xl',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '30px',
        lineHeight: '36px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '30px',
        lineHeight: '36px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '30px',
        lineHeight: '36px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '30px',
        lineHeight: '36px',
        sample: 'Ag',
      },
    ],
  },
  {
    label: 'text-4xl',
    variants: [
      {
        name: 'Regular',
        weight: 'Regular',
        size: '36px',
        lineHeight: '40px',
        sample: 'Ag',
      },
      {
        name: 'Medium',
        weight: 'Medium',
        size: '36px',
        lineHeight: '40px',
        sample: 'Ag',
      },
      {
        name: 'Semibold',
        weight: 'Semi Bold',
        size: '36px',
        lineHeight: '40px',
        sample: 'Ag',
      },
      {
        name: 'Underline',
        weight: 'Regular',
        size: '36px',
        lineHeight: '40px',
        sample: 'Ag',
      },
    ],
  },
];

export const Typography: Story = {
  args: {
    categories: typographyCategories,
  },
  render: (args) => (
    <div className="min-h-screen bg-[#f8f8f3] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
            Foundations
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl text-[#3e1915]">
            Typography
          </h1>
          <p className="text-base leading-7 text-[#533d32] sm:text-lg">
            Inter is the single typeface for Alveole. Titles use 110% line-height,
            and all other text styles use 120% line-height for optimal readability.
          </p>
        </div>
        <TypographyDisplay {...args} />
      </div>
    </div>
  ),
};
