import type { Meta, StoryObj } from '@storybook/react-vite';
import { GrayscalePalette, type GrayScaleColor } from '@/components/foundations/grayscale-palette';

const meta = {
  title: 'Foundations/Grayscale',
  component: GrayscalePalette,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    a11y: {
      disable: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GrayscalePalette>;

export default meta;
type Story = StoryObj<typeof meta>;

const grayscaleColors: GrayScaleColor[] = [
  { name: 'gray/950', value: '#282824', hex: '#282824' },
  { name: 'gray/900', value: '#3f4039', hex: '#3F4039' },
  { name: 'gray/800', value: '#4c4d43', hex: '#4C4D43' },
  { name: 'gray/700', value: '#59594d', hex: '#59594D' },
  { name: 'gray/600', value: '#676657', hex: '#676657' },
  { name: 'gray/500', value: '#787664', hex: '#787664' },
  { name: 'gray/400', value: '#b6b5a6', hex: '#B6B5A6' },
  { name: 'gray/300', value: '#c6c6b8', hex: '#C6C6B8' },
  { name: 'gray/200', value: '#d8d8cb', hex: '#D8D8CB' },
  { name: 'gray/100', value: '#ecece0', hex: '#ECECE0' },
  { name: 'gray/50', value: '#f8f8f3', hex: '#F8F8F3' },
];

export const Grayscale: Story = {
  args: {
    colors: grayscaleColors,
  },
  render: (args) => (
    <div className="min-h-screen bg-[#f8f8f3] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
            Foundations
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl text-[#3e1915]">
            Grayscale Palette
          </h1>
          <p className="text-base leading-7 text-[#533d32] sm:text-lg">
            A complete grayscale palette from dark (gray/950) to light (gray/50)
            for text, backgrounds, borders, and surface variations throughout
            Alveole.
          </p>
        </div>
        <GrayscalePalette {...args} />
      </div>
    </div>
  ),
};
