import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';

const textVariants = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
] as const;

const textSizes = ['xs', 'sm', 'default', 'lg'] as const;
const iconSizes = ['icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const;

function StoryGrid({
  children,
  columns = 'grid-cols-[120px_repeat(4,minmax(0,1fr))]',
}: {
  children: ReactNode;
  columns?: string;
}) {
  return <div className={`grid items-center gap-3 ${columns}`}>{children}</div>;
}

function RowLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
      {children}
    </div>
  );
}

function SizeLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-center text-xs font-medium text-muted-foreground">
      {children}
    </div>
  );
}

function InlineStartIcon({ size }: { size: number }) {
  return (
    <span data-icon="inline-start" aria-hidden="true">
      <HugeiconsIcon icon={ArrowLeft01Icon} size={size} />
    </span>
  );
}

function InlineEndIcon({ size }: { size: number }) {
  return (
    <span data-icon="inline-end" aria-hidden="true">
      <HugeiconsIcon icon={ArrowRight01Icon} size={size} />
    </span>
  );
}

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: {
    children: 'Continue',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: textVariants,
    },
    size: {
      control: 'select',
      options: [...textSizes, ...iconSizes],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-center justify-center p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryGrid>
      <div />
      {textSizes.map((size) => (
        <SizeLabel key={size}>{size}</SizeLabel>
      ))}
      {textVariants.map((variant) => (
        <Fragment key={variant}>
          <RowLabel key={`${variant}-label`}>{variant}</RowLabel>
          {textSizes.map((size) => (
            <div key={`${variant}-${size}`} className="flex justify-center">
              <Button variant={variant} size={size}>
                Continue
              </Button>
            </div>
          ))}
        </Fragment>
      ))}
    </StoryGrid>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {textVariants.map((variant) => (
        <div key={variant} className="space-y-3">
          <RowLabel>{variant}</RowLabel>
          <div className="flex flex-wrap items-center gap-3">
            {textSizes.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                Continue
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['default', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant} className="space-y-3">
          <RowLabel>{variant}</RowLabel>
          <div className="flex flex-wrap items-center gap-3">
            {iconSizes.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={size.includes('xs') ? 12 : size.includes('sm') ? 14 : 16}
                />
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const IconExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <RowLabel>Inline Icons</RowLabel>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <InlineStartIcon size={16} />
            Continue
          </Button>
          <Button>
            Continue
            <InlineEndIcon size={16} />
          </Button>
          <Button variant="secondary" size="lg">
            <InlineStartIcon size={20} />
            Review names
          </Button>
          <Button variant="outline" size="sm">
            Learn more
            <InlineEndIcon size={14} />
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <RowLabel>Icon Only</RowLabel>
        <div className="flex flex-wrap items-center gap-3">
          {iconSizes.map((size) => (
            <Button key={size} size={size} aria-label={`Arrow button ${size}`}>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={size.includes('xs') ? 12 : size.includes('sm') ? 14 : 16}
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const StatesAndExamples: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div className="space-y-3">
        <RowLabel>Product Examples</RowLabel>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-brand-yellow text-foreground-accent hover:bg-brand-yellow/90">
            Continue
          </Button>
          <Button
            className="bg-brand-yellow text-foreground-accent hover:bg-brand-yellow/90"
            size="lg"
          >
            Continue
            <InlineEndIcon size={20} />
          </Button>
          <Button
            className="w-full max-w-xs bg-brand-yellow text-foreground-accent hover:bg-brand-yellow/90"
            size="lg"
          >
            Submit your name
          </Button>
          <Button variant="ghost" className="text-base font-medium">
            View submitted names
          </Button>
          <Button variant="link">View terms</Button>
        </div>
      </div>
      <div className="space-y-3">
        <RowLabel>Disabled</RowLabel>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Continue</Button>
          <Button variant="secondary" disabled>
            Review names
          </Button>
          <Button variant="destructive" disabled>
            Delete hive
          </Button>
          <Button
            className="bg-brand-yellow text-foreground-accent hover:bg-brand-yellow/90"
            disabled
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  ),
};
