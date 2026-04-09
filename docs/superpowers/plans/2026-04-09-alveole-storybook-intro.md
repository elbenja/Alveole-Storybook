# Alveole Storybook Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom default Storybook intro page inspired by the Alveole Figma foundations, including a web-optimized hero, recolorable logo showcase, and core brand color foundations.

**Architecture:** Add a dedicated intro page component and story under `src/stories`, backed by small reusable presentational components for logo marks, chapter pills, branding cards, and color swatches. Use Storybook navigation ordering plus preview parameters so the intro renders as the first/default experience without introducing a separate styling framework.

**Tech Stack:** Storybook 10, React 19, TypeScript, Storybook docs/stories, Tailwind CSS v4 utilities, project CSS variables in `src/index.css`

**Spec:** `docs/superpowers/specs/2026-04-09-alveole-storybook-intro-design.md`

---

## File Structure

```
.storybook/
  main.ts                              # story ordering and docs config
  preview.tsx                          # optional layout/background params for intro
src/
  components/
    intro/
      alveole-logo.tsx                 # reusable inline logo mark components
      hero-chapters.tsx                # cover-style chapter pills
      branding-card.tsx                # logo specimen cards
      color-swatch.tsx                 # palette tile
      storybook-intro-page.tsx         # assembled landing page
  stories/
    00-Introduction.stories.tsx        # default intro entry shown first
  index.css                            # intro-specific utilities / tokens if needed
```

### Task 1: Inspect current Storybook ordering behavior

**Files:**
- Modify: `.storybook/main.ts`

- [ ] **Step 1: Confirm the intro can be made first via story sorting**

Read `.storybook/main.ts` and note current `stories` and `addons` config.

Expected result:
- Storybook uses filesystem story loading
- we can add `options.storySort` to prioritize the intro story

- [ ] **Step 2: Define the intended story title**

Use the title:

```ts
'Introduction/Overview'
```

Expected result:
- a stable, explicit title that can be sorted to the top

### Task 2: Build reusable logo components

**Files:**
- Create: `src/components/intro/alveole-logo.tsx`
- Test: `src/stories/00-Introduction.stories.tsx`

- [ ] **Step 1: Write the logo component API**

Create a component surface like:

```ts
type AlveoleLogoProps = {
  variant?: 'primary' | 'icon' | 'wordmark';
  color?: string;
  className?: string;
  title?: string;
};
```

Expected result:
- one reusable API for recolorable brand marks

- [ ] **Step 2: Implement inline SVG marks**

Create `src/components/intro/alveole-logo.tsx` with:

```tsx
import { cn } from '@/lib/utils';

type AlveoleLogoProps = {
  variant?: 'primary' | 'icon' | 'wordmark';
  color?: string;
  className?: string;
  title?: string;
};

function HexIcon({
  color,
  className,
  title,
}: {
  color: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 86 92"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43 3 77 22.5V69.5L43 89 9 69.5V22.5L43 3Z"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Wordmark({
  color,
  className,
  title,
}: {
  color: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 222 92"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="64"
        fill={color}
        fontFamily="Inter Variable, Inter, sans-serif"
        fontSize="58"
        fontWeight="450"
        letterSpacing="-2.2"
      >
        alvéole
      </text>
    </svg>
  );
}

export function AlveoleLogo({
  variant = 'primary',
  color = 'currentColor',
  className,
  title = 'Alveole logo',
}: AlveoleLogoProps) {
  if (variant === 'icon') {
    return <HexIcon color={color} className={className} title={title} />;
  }

  if (variant === 'wordmark') {
    return <Wordmark color={color} className={className} title={title} />;
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <HexIcon color={color} className="h-auto w-[4.5rem] shrink-0" title={title} />
      <Wordmark color={color} className="h-auto w-[8.6rem]" title={title} />
    </div>
  );
}
```

Expected result:
- logo treatments can be recolored with a prop
- no remote Figma asset dependency on the landing page

### Task 3: Build intro page primitives

**Files:**
- Create: `src/components/intro/hero-chapters.tsx`
- Create: `src/components/intro/branding-card.tsx`
- Create: `src/components/intro/color-swatch.tsx`

- [ ] **Step 1: Create chapter pill component**

Add `src/components/intro/hero-chapters.tsx`:

```tsx
const chapters = [
  '01 Foundations',
  '02 Typography',
  '03 Layout',
  '04 Components',
  '05 Patterns',
  '06 Screens',
] as const;

export function HeroChapters() {
  return (
    <div className="flex flex-wrap gap-3">
      {chapters.map((chapter) => (
        <span
          key={chapter}
          className="rounded-full bg-[#006d6a] px-4 py-2 text-xs font-semibold tracking-[0.01em] text-[#fdff91]"
        >
          {chapter}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create branding card component**

Add `src/components/intro/branding-card.tsx`:

```tsx
import type { ReactNode } from 'react';

type BrandingCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  background: string;
  foreground: string;
  accent: string;
  specimen: ReactNode;
  bordered?: boolean;
};

export function BrandingCard({
  eyebrow,
  title,
  description,
  background,
  foreground,
  accent,
  specimen,
  bordered = false,
}: BrandingCardProps) {
  return (
    <article
      className="flex min-h-[26rem] flex-col rounded-[24px] p-7 shadow-sm"
      style={{
        background,
        color: foreground,
        border: bordered ? '1px solid #d8d8cb' : '1px solid transparent',
      }}
    >
      <p className="text-sm font-medium">{eyebrow}</p>
      <h3 className="mt-2 text-[1.75rem] font-light leading-8">{title}</h3>
      <p className="mt-3 max-w-[30ch] text-base leading-6 opacity-90">{description}</p>
      <div className="mt-8 flex flex-1 items-center justify-center rounded-[20px] bg-white/5">
        {specimen}
      </div>
      <div className="mt-8 h-1 w-14 rounded-full" style={{ background: accent }} />
    </article>
  );
}
```

- [ ] **Step 3: Create color swatch component**

Add `src/components/intro/color-swatch.tsx`:

```tsx
type ColorSwatchProps = {
  name: string;
  value: string;
  swatch: string;
  border?: string;
};

export function ColorSwatch({
  name,
  value,
  swatch,
  border = 'transparent',
}: ColorSwatchProps) {
  return (
    <div className="space-y-3">
      <div
        className="aspect-square rounded-[20px]"
        style={{ background: swatch, border: `1px solid ${border}` }}
      />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[#2a2c29]">{name}</p>
        <p className="text-xs text-[#787664]">{value}</p>
      </div>
    </div>
  );
}
```

### Task 4: Assemble the Storybook intro page

**Files:**
- Create: `src/components/intro/storybook-intro-page.tsx`

- [ ] **Step 1: Add curated brand palette data**

In `src/components/intro/storybook-intro-page.tsx`, define:

```ts
const brandColors = [
  { name: 'brand/yellow', value: '#FDFF91', swatch: '#FDFF91' },
  { name: 'brand/teal', value: '#006D6A', swatch: '#006D6A' },
  { name: 'brand/dark-teal', value: '#013331', swatch: '#013331' },
  { name: 'brand/ruby', value: '#3E1915', swatch: '#3E1915' },
  { name: 'brand/light-brown', value: '#533D32', swatch: '#533D32' },
  { name: 'neutral/black', value: '#2A2C29', swatch: '#2A2C29' },
  { name: 'neutral/white', value: '#FFFFFF', swatch: '#FFFFFF', border: '#d8d8cb' },
  { name: 'neutral/warm-gray', value: '#787664', swatch: '#787664' },
  { name: 'neutral/soft-gray', value: '#ECECE0', swatch: '#ECECE0' },
] as const;
```

- [ ] **Step 2: Implement the full landing page**

Add `src/components/intro/storybook-intro-page.tsx`:

```tsx
import { AlveoleLogo } from './alveole-logo';
import { BrandingCard } from './branding-card';
import { ColorSwatch } from './color-swatch';
import { HeroChapters } from './hero-chapters';

const brandColors = [
  { name: 'brand/yellow', value: '#FDFF91', swatch: '#FDFF91' },
  { name: 'brand/teal', value: '#006D6A', swatch: '#006D6A' },
  { name: 'brand/dark-teal', value: '#013331', swatch: '#013331' },
  { name: 'brand/ruby', value: '#3E1915', swatch: '#3E1915' },
  { name: 'brand/light-brown', value: '#533D32', swatch: '#533D32' },
  { name: 'neutral/black', value: '#2A2C29', swatch: '#2A2C29' },
  { name: 'neutral/white', value: '#FFFFFF', swatch: '#FFFFFF', border: '#d8d8cb' },
  { name: 'neutral/warm-gray', value: '#787664', swatch: '#787664' },
  { name: 'neutral/soft-gray', value: '#ECECE0', swatch: '#ECECE0' },
] as const;

export function StorybookIntroPage() {
  return (
    <main className="bg-[#f8f8f3] text-[#2a2c29]">
      <section className="px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto overflow-hidden rounded-[32px] bg-[#013331] px-6 py-8 text-[#ecece0] sm:px-10 sm:py-12 lg:px-[4.5rem] lg:py-[4.5rem]">
          <div className="flex min-h-[32rem] flex-col justify-between gap-14">
            <AlveoleLogo color="#FDFF91" className="w-fit" />
            <div className="max-w-4xl space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#fdff91]">
                  Alveole Working Draft
                </p>
                <h1 className="max-w-[12ch] text-4xl font-semibold leading-tight text-[#fdff91] sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
                  Design System Foundations
                </h1>
                <p className="max-w-3xl text-base leading-7 text-[#ecece0] sm:text-lg">
                  Source of truth for the Alveole visual system across brand moments,
                  reusable UI, and validation screens. This intro page brings the core
                  foundations into Storybook in a web-first format.
                </p>
              </div>
              <HeroChapters />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
              Branding
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              A logo system built for bold moments and calm surfaces.
            </h2>
            <p className="text-base leading-7 text-[#533d32] sm:text-lg">
              The three core marks can be applied across high-contrast hero sections,
              compact brand signatures, and lighter editorial layouts. Each specimen
              below uses live colorable artwork rather than static screenshots.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <BrandingCard
              eyebrow="Primary lockup"
              title="Logo"
              description="Preferred signature for bold brand moments and high-contrast placements."
              background="#013331"
              foreground="#ECECE0"
              accent="#FDFF91"
              specimen={<AlveoleLogo color="#FDFF91" className="scale-[1.15]" />}
            />
            <BrandingCard
              eyebrow="Brand mark"
              title="Icon"
              description="Compact hex mark for favicons, avatars, and minimal brand applications."
              background="#FDFF91"
              foreground="#013331"
              accent="#013331"
              specimen={<AlveoleLogo variant="icon" color="#2A2C29" className="h-auto w-28" />}
            />
            <BrandingCard
              eyebrow="Secondary lockup"
              title="Wordmark"
              description="Lightweight signature for calm surfaces, supporting layouts, and editorial use."
              background="#F8F8F3"
              foreground="#2A2C29"
              accent="#FDFF91"
              bordered
              specimen={<AlveoleLogo variant="wordmark" color="#2A2C29" className="h-auto w-56" />}
            />
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
              Foundations
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Core brand and neutral colors
            </h2>
            <p className="text-base leading-7 text-[#533d32] sm:text-lg">
              A concise palette view for the colors that define Alveole’s first impression,
              content contrast, and supporting surfaces across the system.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {brandColors.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                value={color.value}
                swatch={color.swatch}
                border={'border' in color ? color.border : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

### Task 5: Expose the page as the first/default Storybook entry

**Files:**
- Create: `src/stories/00-Introduction.stories.tsx`
- Modify: `.storybook/main.ts`
- Modify: `.storybook/preview.tsx`

- [ ] **Step 1: Create the intro story**

Add `src/stories/00-Introduction.stories.tsx`:

```tsx
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
```

- [ ] **Step 2: Add Storybook sort order**

Update `.storybook/main.ts` to:

```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: '@storybook/react-vite',
  docs: {
    defaultName: 'Documentation',
  },
};

export default config;
```

Then update `.storybook/preview.tsx` parameters with:

```ts
options: {
  storySort: {
    order: ['Introduction', ['Overview']],
  },
},
```

Expected result:
- the intro story sits at the top of the sidebar and becomes the first default view

### Task 6: Add any needed intro-specific CSS polish

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add subtle body polish for Storybook docs background consistency if needed**

Append only if visual gaps appear:

```css
.sb-show-main.sb-main-padded {
  background: #f8f8f3;
}
```

Expected result:
- fullscreen intro feels intentional inside Storybook chrome

### Task 7: Verify behavior

**Files:**
- Test: `src/stories/00-Introduction.stories.tsx`
- Test: `.storybook/preview.tsx`
- Test: `.storybook/main.ts`

- [ ] **Step 1: Run Storybook**

Run:

```bash
bun run storybook
```

Expected:
- Storybook starts successfully
- `Introduction/Overview` appears first in the sidebar

- [ ] **Step 2: Validate responsive layout**

Check:
- Desktop viewport keeps the hero editorial and spacious
- Tablet wraps branding cards cleanly
- Mobile stacks sections without horizontal scrolling

Expected:
- no clipped logo treatments
- no overflow in color swatches or hero pills

- [ ] **Step 3: Run build verification**

Run:

```bash
bun run build-storybook
```

Expected:
- successful static Storybook build with no TypeScript or story indexing errors

- [ ] **Step 4: Commit**

Run:

```bash
git add .storybook/main.ts .storybook/preview.tsx src/components/intro src/stories/00-Introduction.stories.tsx src/index.css docs/superpowers/specs/2026-04-09-alveole-storybook-intro-design.md docs/superpowers/plans/2026-04-09-alveole-storybook-intro.md
git commit -m "feat: add Alveole Storybook intro page"
```
