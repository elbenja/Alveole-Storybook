# Alveole-Storybook: Name the Queen — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh Storybook project with the Alveole brand design system and a 5-step "Name the Queen" interactive flow, deployed to Vercel.

**Architecture:** Fresh Vite + React 19 + Storybook 10 project with Tailwind v4 and shadcn standard preset customized to Alveole brand tokens. The "Name the Queen" flow is a state-machine-driven component with 5 steps (input, submitted, voting, votes-complete, winner), rendered inside a shared card shell. Lottie animations provide background effects on Steps 1 and 5.

**Tech Stack:** Vite 7, React 19, TypeScript, Storybook 10 (`@storybook/react-vite`), Tailwind CSS v4, shadcn (standard preset), lottie-react, Hugeicons, bun, Vercel.

**Spec:** `docs/superpowers/specs/2026-04-08-alveole-storybook-name-the-queen-design.md`

---

## File Structure

```
alveole-storybook/
├── .storybook/
│   ├── main.ts                          # Storybook config (addons, framework)
│   └── preview.tsx                      # Global decorators, viewports, theme
├── src/
│   ├── index.css                        # Tailwind v4 + Alveole brand tokens
│   ├── lib/
│   │   └── utils.ts                     # cn() helper (shadcn)
│   ├── data/
│   │   └── mock-queen-names.ts          # Mock suggestions, constants
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx               # shadcn Button (Alveole-themed)
│   │   │   ├── input.tsx                # shadcn Input (Alveole-themed)
│   │   │   └── badge.tsx                # shadcn Badge (Alveole-themed)
│   │   ├── primitives/
│   │   │   ├── vote-toggle.tsx          # Upvote button (default/voted)
│   │   │   ├── name-list-item.tsx       # Rank + name + vote toggle row
│   │   │   └── lottie-background.tsx    # Lottie wrapper (hover-to-play, blend modes)
│   │   ├── composites/
│   │   │   ├── queen-card.tsx           # Card shell (rounded-xl, shadow)
│   │   │   ├── card-header.tsx          # Icon circle + title + subtitle + Lottie
│   │   │   ├── card-media.tsx           # Step-specific media content
│   │   │   └── name-list.tsx            # Sorted name list with votes
│   │   └── screens/
│   │       └── name-the-queen.tsx       # State machine wrapper (all 5 steps)
│   ├── stories/
│   │   ├── primitives/
│   │   │   ├── VoteToggle.stories.tsx
│   │   │   ├── NameListItem.stories.tsx
│   │   │   ├── LottieBackground.stories.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Input.stories.tsx
│   │   │   └── Badge.stories.tsx
│   │   ├── composites/
│   │   │   ├── QueenCard.stories.tsx
│   │   │   ├── CardHeader.stories.tsx
│   │   │   ├── CardMedia.stories.tsx
│   │   │   └── NameList.stories.tsx
│   │   └── screens/
│   │       └── NameTheQueen.stories.tsx  # All step stories + FullFlow
│   └── assets/
│       └── lottie/
│           ├── clouds.json              # Step 1: drifting clouds
│           └── celebration.json         # Step 5: golden particles
├── public/
│   └── bee-specimen.jpg                 # Bee photo for Step 1
├── components.json                      # shadcn config
├── vercel.json                          # Vercel deployment config
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.mjs
├── eslint.config.js
└── package.json
```

---

## Task 1: Scaffold Vite + React Project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`

- [ ] **Step 1: Create the Vite project with React + TypeScript**

```bash
cd "/Users/benjaminsaravia/Library/CloudStorage/GoogleDrive-elbenja@gmail.com/My Drive/Projects/Alveole/Alveole-Storybook"
bun create vite . --template react-ts
```

If prompted about existing directory (docs folder exists), confirm overwrite. Expected: scaffolded project with `package.json`, `vite.config.ts`, `tsconfig.json`, etc.

- [ ] **Step 2: Install dependencies**

```bash
bun install
```

Expected: `node_modules/` created, `bun.lock` generated.

- [ ] **Step 3: Configure path aliases in vite.config.ts**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 4: Configure path aliases in tsconfig.app.json**

Add to `compilerOptions` in `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 5: Verify the dev server starts**

```bash
bun run dev
```

Expected: Vite dev server starts on localhost. Kill it after confirming.

- [ ] **Step 6: Commit**

```bash
git init
echo "node_modules/\ndist/\nstorybook-static/\n.superpowers/" > .gitignore
git add -A
git commit -m "chore: scaffold Vite + React 19 + TypeScript project"
```

---

## Task 2: Add Tailwind CSS v4 + shadcn Standard Preset

**Files:**
- Create: `src/index.css`, `src/lib/utils.ts`, `components.json`, `postcss.config.mjs`
- Modify: `src/main.tsx` (import CSS)

- [ ] **Step 1: Install Tailwind CSS v4 and PostCSS**

```bash
bun add tailwindcss @tailwindcss/vite @tailwindcss/postcss postcss
```

- [ ] **Step 2: Add Tailwind Vite plugin to vite.config.ts**

Replace `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 3: Create postcss.config.mjs**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 4: Create src/index.css with Tailwind v4 imports**

```css
@import 'tailwindcss';
```

- [ ] **Step 5: Update src/main.tsx to import the CSS**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>Alveole Storybook</div>
  </StrictMode>
);
```

- [ ] **Step 6: Initialize shadcn**

```bash
bunx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

This creates `components.json` and updates `src/index.css` with shadcn CSS variables.

- [ ] **Step 7: Install shadcn utility deps**

```bash
bun add class-variance-authority clsx tailwind-merge tw-animate-css
```

- [ ] **Step 8: Create src/lib/utils.ts**

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 9: Update components.json for aliases**

Ensure `components.json` has:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: add Tailwind CSS v4 + shadcn standard preset"
```

---

## Task 3: Alveole Brand Design Tokens

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Override shadcn CSS variables with Alveole brand tokens**

Replace the `:root` / `.dark` CSS variable block in `src/index.css` (keeping the `@import 'tailwindcss'` at top) with the Alveole brand tokens. The full file should be:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Alveole custom tokens */
  --color-brand-yellow: var(--brand-yellow);
  --color-warm-orange: var(--warm-orange);
  --color-foreground-accent: var(--foreground-accent);
  --color-foreground-muted: var(--foreground-muted);
  --color-border-success: var(--border-success);
  --color-bg-success-light: var(--bg-success-light);
  --color-bg-success-light-hover: var(--bg-success-light-hover);
  --color-algray-200: var(--algray-200);
  --color-algray-50: var(--algray-50);
}

:root {
  --radius: 0.5rem;
  --background: #f8f8f3;
  --foreground: #282824;
  --card: #f8f8f3;
  --card-foreground: #282824;
  --popover: #f8f8f3;
  --popover-foreground: #282824;
  --primary: #3e1915;
  --primary-foreground: #f8f8f3;
  --secondary: #d8d8cb;
  --secondary-foreground: #282824;
  --muted: #d8d8cb;
  --muted-foreground: #787664;
  --accent: #3e1915;
  --accent-foreground: #f8f8f3;
  --destructive: #dc2626;
  --border: #d8d8cb;
  --input: #d8d8cb;
  --ring: #3e1915;
  --chart-1: #db5012;
  --chart-2: #059669;
  --chart-3: #fdff91;
  --chart-4: #3e1915;
  --chart-5: #787664;

  /* Alveole custom tokens */
  --brand-yellow: #fdff91;
  --warm-orange: #db5012;
  --foreground-accent: #3e1915;
  --foreground-muted: #787664;
  --border-success: #059669;
  --bg-success-light: rgba(5, 150, 105, 0.15);
  --bg-success-light-hover: rgba(5, 150, 105, 0.2);
  --algray-200: rgba(216, 216, 203, 0.5);
  --algray-50: rgba(248, 248, 243, 0.5);

  /* Alveole spacing */
  --padding-3xl: 48px;
  --padding-xxl: 40px;
  --padding-xl: 32px;
  --padding-lg: 24px;
  --padding-sm: 16px;
  --padding-xs: 12px;
  --padding-xxs: 8px;

  /* Alveole radii */
  --radius-card: 16px;
  --radius-input: 6px;
  --radius-button: 2px;
  --radius-pill: 400px;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', sans-serif;
  }
}
```

- [ ] **Step 2: Verify Tailwind builds without errors**

```bash
bun run dev
```

Expected: Dev server starts without CSS errors. Kill after confirming.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add Alveole brand design tokens to shadcn theme"
```

---

## Task 4: Install Storybook 10

**Files:**
- Create: `.storybook/main.ts`, `.storybook/preview.tsx`
- Modify: `package.json` (scripts + devDependencies)

- [ ] **Step 1: Initialize Storybook**

```bash
bunx storybook@latest init
```

When prompted, accept defaults for React + Vite. This installs `@storybook/react-vite`, creates `.storybook/main.ts` and `.storybook/preview.ts`, adds scripts to `package.json`, and creates example stories in `src/stories/`.

- [ ] **Step 2: Delete auto-generated example stories**

```bash
rm -rf src/stories/
```

We'll create our own story structure.

- [ ] **Step 3: Install additional Storybook addons**

```bash
bun add -D @storybook/addon-a11y @storybook/addon-themes
```

- [ ] **Step 4: Configure .storybook/main.ts**

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
};

export default config;
```

- [ ] **Step 5: Configure .storybook/preview.tsx with Alveole viewports and responsive decorator**

```tsx
import React from 'react';
import type { Preview, StoryContext } from '@storybook/react-vite';
import { useGlobals } from 'storybook/preview-api';
import { withThemeByClassName } from '@storybook/addon-themes';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import '../src/index.css';

const alveoleViewports = {
  mobile: {
    name: 'Mobile',
    styles: { width: '375px', height: '812px' },
  },
  tablet: {
    name: 'Tablet',
    styles: { width: '768px', height: '1024px' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '1440px', height: '900px' },
  },
};

const breakpointWidths: Record<string, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

function ScreensBreakpointDecorator(
  Story: React.ComponentType,
  context: StoryContext
) {
  const [globals] = useGlobals();
  const bp = globals.screensBreakpoint as string | undefined;

  if (!context.title?.startsWith('Screens/')) {
    return <Story />;
  }

  const width = (bp && breakpointWidths[bp]) ?? '100%';

  return (
    <div
      style={{
        width,
        margin: '0 auto',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Story />
    </div>
  );
}

const preview: Preview = {
  globalTypes: {
    screensBreakpoint: {
      name: 'Screens Breakpoint',
      toolbar: {
        title: 'Screens Breakpoint',
        items: [
          {
            value: 'desktop',
            icon: 'monitor',
            title: 'Desktop (1440px)',
          },
          {
            value: 'tablet',
            icon: 'tablet',
            title: 'Tablet (768px)',
          },
          {
            value: 'mobile',
            icon: 'mobile',
            title: 'Mobile (375px)',
          },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    screensBreakpoint: 'desktop',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...alveoleViewports,
      },
    },
  },
  decorators: [
    ScreensBreakpointDecorator,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
```

- [ ] **Step 6: Verify Storybook starts**

```bash
bun run storybook
```

Expected: Storybook 10 launches on port 6006 with no stories (empty sidebar). Kill after confirming.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: add Storybook 10 with Alveole viewports and responsive decorator"
```

---

## Task 5: Install Hugeicons + lottie-react

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Hugeicons**

```bash
bun add @hugeicons/react @hugeicons/core-free-icons
```

- [ ] **Step 2: Install lottie-react**

```bash
bun add lottie-react
```

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add Hugeicons and lottie-react dependencies"
```

---

## Task 6: Add shadcn Button, Input, and Badge Components

**Files:**
- Create: `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/components/ui/badge.tsx`
- Create: `src/stories/primitives/Button.stories.tsx`, `src/stories/primitives/Input.stories.tsx`, `src/stories/primitives/Badge.stories.tsx`

- [ ] **Step 1: Add shadcn Button component**

```bash
bunx shadcn@latest add button
```

- [ ] **Step 2: Add shadcn Input component**

```bash
bunx shadcn@latest add input
```

- [ ] **Step 3: Add shadcn Badge component**

```bash
bunx shadcn@latest add badge
```

- [ ] **Step 4: Create Button story**

Create `src/stories/primitives/Button.stories.tsx`:

```tsx
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
```

- [ ] **Step 5: Create Input story**

Create `src/stories/primitives/Input.stories.tsx`:

```tsx
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
```

- [ ] **Step 6: Create Badge story**

Create `src/stories/primitives/Badge.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Crowned with 12 votes',
    className:
      'border-border bg-transparent text-foreground rounded-full text-xs font-semibold',
  },
};
```

- [ ] **Step 7: Verify stories render in Storybook**

```bash
bun run storybook
```

Expected: Three stories under `Primitives/` — Button, Input, Badge all render correctly. Kill after confirming.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add shadcn Button, Input, Badge with Alveole-themed stories"
```

---

## Task 7: Mock Data

**Files:**
- Create: `src/data/mock-queen-names.ts`

- [ ] **Step 1: Create mock data file**

Create `src/data/mock-queen-names.ts`:

```ts
export interface QueenSuggestion {
  id: number;
  name: string;
  votes: number;
}

export const MOCK_SUGGESTIONS: QueenSuggestion[] = [
  { id: 1, name: 'Empress Honeydew', votes: 12 },
  { id: 2, name: 'Queen Cleopollen', votes: 9 },
  { id: 3, name: 'Lady Buzzworth', votes: 7 },
  { id: 4, name: 'Duchess Nectar', votes: 6 },
  { id: 5, name: 'Madame Hivemind', votes: 4 },
  { id: 6, name: 'Another', votes: 3 },
];

export const USER_SUBMITTED_NAME = 'Queen Sting';
export const MAX_VOTES = 3;
export const WINNER = MOCK_SUGGESTIONS[0];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/mock-queen-names.ts
git commit -m "feat: add mock data for Name the Queen flow"
```

---

## Task 8: LottieBackground Primitive

**Files:**
- Create: `src/components/primitives/lottie-background.tsx`, `src/stories/primitives/LottieBackground.stories.tsx`
- Create: `src/assets/lottie/clouds.json`, `src/assets/lottie/celebration.json`

- [ ] **Step 1: Create placeholder Lottie JSON files**

Create `src/assets/lottie/clouds.json` — a simple drifting clouds animation placeholder. We'll use a minimal Lottie structure:

```json
{
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 400,
  "h": 300,
  "nm": "Clouds",
  "layers": [
    {
      "ty": 4,
      "nm": "Cloud 1",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 40 },
        "p": {
          "a": 1,
          "k": [
            { "t": 0, "s": [-50, 80, 0], "to": [75, 0, 0], "ti": [-75, 0, 0] },
            { "t": 90, "s": [450, 80, 0] }
          ]
        },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "shapes": [
        {
          "ty": "el",
          "p": { "a": 0, "k": [0, 0] },
          "s": { "a": 0, "k": [120, 50] }
        },
        {
          "ty": "fl",
          "c": { "a": 0, "k": [0.85, 0.85, 0.8, 1] },
          "o": { "a": 0, "k": 60 }
        }
      ],
      "ip": 0,
      "op": 90
    },
    {
      "ty": 4,
      "nm": "Cloud 2",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 30 },
        "p": {
          "a": 1,
          "k": [
            { "t": 0, "s": [400, 150, 0], "to": [-66, 0, 0], "ti": [66, 0, 0] },
            { "t": 90, "s": [0, 150, 0] }
          ]
        },
        "s": { "a": 0, "k": [80, 80, 100] }
      },
      "shapes": [
        {
          "ty": "el",
          "p": { "a": 0, "k": [0, 0] },
          "s": { "a": 0, "k": [100, 40] }
        },
        {
          "ty": "fl",
          "c": { "a": 0, "k": [0.9, 0.9, 0.85, 1] },
          "o": { "a": 0, "k": 50 }
        }
      ],
      "ip": 0,
      "op": 90
    }
  ]
}
```

Create `src/assets/lottie/celebration.json` — a simple golden sparkle animation placeholder:

```json
{
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 500,
  "h": 400,
  "nm": "Celebration",
  "layers": [
    {
      "ty": 4,
      "nm": "Sparkle 1",
      "sr": 1,
      "ks": {
        "o": { "a": 1, "k": [
          { "t": 0, "s": [0] },
          { "t": 15, "s": [100] },
          { "t": 45, "s": [100] },
          { "t": 60, "s": [0] }
        ]},
        "p": { "a": 0, "k": [150, 120, 0] },
        "s": { "a": 1, "k": [
          { "t": 0, "s": [0, 0, 100] },
          { "t": 30, "s": [100, 100, 100] },
          { "t": 60, "s": [0, 0, 100] }
        ]}
      },
      "shapes": [
        {
          "ty": "sr",
          "p": { "a": 0, "k": [0, 0] },
          "or": { "a": 0, "k": 8 },
          "ir": { "a": 0, "k": 3 },
          "pt": { "a": 0, "k": 4 },
          "r": { "a": 0, "k": 0 }
        },
        {
          "ty": "fl",
          "c": { "a": 0, "k": [0.99, 1, 0.57, 1] },
          "o": { "a": 0, "k": 80 }
        }
      ],
      "ip": 0,
      "op": 60
    },
    {
      "ty": 4,
      "nm": "Sparkle 2",
      "sr": 1,
      "ks": {
        "o": { "a": 1, "k": [
          { "t": 10, "s": [0] },
          { "t": 25, "s": [100] },
          { "t": 50, "s": [100] },
          { "t": 60, "s": [0] }
        ]},
        "p": { "a": 0, "k": [320, 200, 0] },
        "s": { "a": 1, "k": [
          { "t": 10, "s": [0, 0, 100] },
          { "t": 40, "s": [100, 100, 100] },
          { "t": 60, "s": [0, 0, 100] }
        ]}
      },
      "shapes": [
        {
          "ty": "sr",
          "p": { "a": 0, "k": [0, 0] },
          "or": { "a": 0, "k": 6 },
          "ir": { "a": 0, "k": 2 },
          "pt": { "a": 0, "k": 4 },
          "r": { "a": 0, "k": 45 }
        },
        {
          "ty": "fl",
          "c": { "a": 0, "k": [0.99, 1, 0.57, 1] },
          "o": { "a": 0, "k": 70 }
        }
      ],
      "ip": 0,
      "op": 60
    }
  ]
}
```

Note: These are functional placeholders. Replace with proper LottieFiles assets later for production quality.

- [ ] **Step 2: Create LottieBackground component**

Create `src/components/primitives/lottie-background.tsx`:

```tsx
import { useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { cn } from '@/lib/utils';

interface LottieBackgroundProps {
  animationData: Record<string, unknown>;
  className?: string;
  blendMode?: 'normal' | 'screen';
  hoverToPlay?: boolean;
}

export function LottieBackground({
  animationData,
  className,
  blendMode = 'normal',
  hoverToPlay = false,
}: LottieBackgroundProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      style={{ mixBlendMode: blendMode }}
      onMouseEnter={() => {
        if (hoverToPlay) {
          setIsHovered(true);
          lottieRef.current?.play();
        }
      }}
      onMouseLeave={() => {
        if (hoverToPlay) {
          setIsHovered(false);
          lottieRef.current?.pause();
        }
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={!hoverToPlay}
        className="w-full h-full"
        style={{ pointerEvents: hoverToPlay ? 'auto' : 'none' }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Create LottieBackground story**

Create `src/stories/primitives/LottieBackground.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LottieBackground } from '@/components/primitives/lottie-background';
import cloudsAnimation from '@/assets/lottie/clouds.json';
import celebrationAnimation from '@/assets/lottie/celebration.json';

const meta: Meta<typeof LottieBackground> = {
  title: 'Primitives/LottieBackground',
  component: LottieBackground,
  decorators: [
    (Story) => (
      <div className="relative w-[336px] h-[252px] bg-gradient-to-b from-[var(--algray-200)] to-[var(--algray-50)] rounded-xl overflow-hidden">
        <Story />
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="text-foreground-accent font-light text-2xl">
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
```

- [ ] **Step 4: Verify in Storybook**

```bash
bun run storybook
```

Expected: `Primitives/LottieBackground` shows Clouds (paused until hover) and Celebration (auto-playing with screen blend).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add LottieBackground primitive with clouds and celebration animations"
```

---

## Task 9: VoteToggle Primitive

**Files:**
- Create: `src/components/primitives/vote-toggle.tsx`, `src/stories/primitives/VoteToggle.stories.tsx`

- [ ] **Step 1: Create VoteToggle component**

Create `src/components/primitives/vote-toggle.tsx`:

```tsx
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp02Icon } from '@hugeicons/core-free-icons';

interface VoteToggleProps {
  votes: number;
  voted?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

export function VoteToggle({
  votes,
  voted = false,
  disabled = false,
  onToggle,
}: VoteToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 h-10 px-3 py-2 rounded-[4px] border text-sm font-medium transition-colors',
        voted
          ? 'bg-bg-success-light border-border-success text-border-success'
          : 'border-[#59594d] text-brand-yellow hover:border-brand-yellow/50',
        disabled && !voted && 'opacity-50 cursor-not-allowed'
      )}
    >
      <HugeiconsIcon icon={ArrowUp02Icon} size={16} />
      <span>{votes}</span>
    </button>
  );
}
```

- [ ] **Step 2: Create VoteToggle story**

Create `src/stories/primitives/VoteToggle.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoteToggle } from '@/components/primitives/vote-toggle';

const meta: Meta<typeof VoteToggle> = {
  title: 'Primitives/VoteToggle',
  component: VoteToggle,
  decorators: [
    (Story) => (
      <div className="bg-[#282824] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VoteToggle>;

export const Default: Story = {
  args: {
    votes: 12,
    voted: false,
  },
};

export const Voted: Story = {
  args: {
    votes: 10,
    voted: true,
  },
};

export const Disabled: Story = {
  args: {
    votes: 3,
    voted: false,
    disabled: true,
  },
};
```

- [ ] **Step 3: Verify in Storybook**

```bash
bun run storybook
```

Expected: `Primitives/VoteToggle` renders 3 variants on dark background.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add VoteToggle primitive with default, voted, and disabled states"
```

---

## Task 10: NameListItem Primitive

**Files:**
- Create: `src/components/primitives/name-list-item.tsx`, `src/stories/primitives/NameListItem.stories.tsx`

- [ ] **Step 1: Create NameListItem component**

Create `src/components/primitives/name-list-item.tsx`:

```tsx
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkBadge04Icon } from '@hugeicons/core-free-icons';
import { VoteToggle } from './vote-toggle';

interface NameListItemProps {
  rank: number;
  name: string;
  votes: number;
  voted?: boolean;
  voteDisabled?: boolean;
  onVoteToggle?: () => void;
}

export function NameListItem({
  rank,
  name,
  votes,
  voted = false,
  voteDisabled = false,
  onVoteToggle,
}: NameListItemProps) {
  return (
    <div className="flex items-center gap-3 p-2 border-b border-[#59594d]">
      <div className="flex items-center justify-center shrink-0 size-10 rounded-full">
        {rank === 1 ? (
          <HugeiconsIcon
            icon={CheckmarkBadge04Icon}
            size={16}
            className="text-[#f8f8f3]"
          />
        ) : (
          <span className="text-sm font-medium text-[#f8f8f3]">{rank}</span>
        )}
      </div>
      <span className="flex-1 text-lg font-semibold text-[#f8f8f3] min-w-0 truncate">
        {name}
      </span>
      <VoteToggle
        votes={votes}
        voted={voted}
        disabled={voteDisabled}
        onToggle={onVoteToggle}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create NameListItem story**

Create `src/stories/primitives/NameListItem.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NameListItem } from '@/components/primitives/name-list-item';

const meta: Meta<typeof NameListItem> = {
  title: 'Primitives/NameListItem',
  component: NameListItem,
  decorators: [
    (Story) => (
      <div className="bg-[#282824] w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NameListItem>;

export const FirstPlace: Story = {
  args: {
    rank: 1,
    name: 'Empress Honeydew',
    votes: 12,
  },
};

export const RegularItem: Story = {
  args: {
    rank: 3,
    name: 'Lady Buzzworth',
    votes: 7,
  },
};

export const VotedItem: Story = {
  args: {
    rank: 2,
    name: 'Queen Cleopollen',
    votes: 10,
    voted: true,
  },
};
```

- [ ] **Step 3: Verify in Storybook**

```bash
bun run storybook
```

Expected: `Primitives/NameListItem` shows 3 variants.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add NameListItem primitive with rank, vote toggle states"
```

---

## Task 11: Composite Components (QueenCard, CardHeader, CardMedia, NameList)

**Files:**
- Create: `src/components/composites/queen-card.tsx`, `src/components/composites/card-header.tsx`, `src/components/composites/card-media.tsx`, `src/components/composites/name-list.tsx`
- Create: `src/stories/composites/QueenCard.stories.tsx`, `src/stories/composites/CardHeader.stories.tsx`, `src/stories/composites/CardMedia.stories.tsx`, `src/stories/composites/NameList.stories.tsx`

- [ ] **Step 1: Create QueenCard component**

Create `src/components/composites/queen-card.tsx`:

```tsx
import { cn } from '@/lib/utils';

interface QueenCardProps {
  variant?: 'light' | 'dark';
  className?: string;
  children: React.ReactNode;
}

export function QueenCard({
  variant = 'light',
  className,
  children,
}: QueenCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center overflow-clip rounded-[var(--radius-card)] shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_1px_2px_-1px_rgba(40,40,36,0.1)]',
        variant === 'light' ? 'bg-[#f8f8f3]' : 'bg-[#282824]',
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create CardHeader component**

Create `src/components/composites/card-header.tsx`:

```tsx
import { cn } from '@/lib/utils';
import { LottieBackground } from '@/components/primitives/lottie-background';

interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  variant?: 'light' | 'dark';
  lottieData?: Record<string, unknown>;
  lottieBlendMode?: 'normal' | 'screen';
  lottieHoverToPlay?: boolean;
  iconBorderColor?: string;
}

export function CardHeader({
  icon,
  title,
  subtitle,
  variant = 'light',
  lottieData,
  lottieBlendMode = 'normal',
  lottieHoverToPlay = false,
  iconBorderColor,
}: CardHeaderProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-4 w-full py-12 px-3',
        isLight && 'bg-gradient-to-b from-[var(--algray-200)] to-[var(--algray-50)]'
      )}
    >
      {lottieData && (
        <LottieBackground
          animationData={lottieData}
          blendMode={lottieBlendMode}
          hoverToPlay={lottieHoverToPlay}
        />
      )}
      <div
        className={cn(
          'relative z-10 flex items-center p-4 rounded-full shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_1px_2px_rgba(40,40,36,0.1)]',
          isLight ? 'bg-white' : 'border-[1.333px]',
          iconBorderColor ? `border-[${iconBorderColor}]` : !isLight && 'border-[#f8f8f3]'
        )}
        style={iconBorderColor ? { borderColor: iconBorderColor, borderWidth: '1.333px', borderStyle: 'solid' } : undefined}
      >
        {icon}
      </div>
      <div className="relative z-10 flex flex-col gap-2 text-center w-[312px]">
        <h3
          className={cn(
            'font-light text-2xl leading-8',
            isLight ? 'text-foreground-accent' : 'text-brand-yellow'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-base leading-[1.1]',
            isLight ? 'text-foreground' : 'text-[#f8f8f3]'
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create CardMedia component**

Create `src/components/composites/card-media.tsx`:

```tsx
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { Crown02Icon } from '@hugeicons/core-free-icons';

interface CardMediaImageProps {
  type: 'image';
  src: string;
  alt: string;
}

interface CardMediaConfirmationProps {
  type: 'confirmation';
  submittedName: string;
}

interface CardMediaWinnerProps {
  type: 'winner';
  winnerName: string;
  votes: number;
}

type CardMediaProps = (CardMediaImageProps | CardMediaConfirmationProps | CardMediaWinnerProps) & {
  className?: string;
};

export function CardMedia(props: CardMediaProps) {
  const { className } = props;

  if (props.type === 'image') {
    return (
      <div
        className={cn(
          'relative w-full h-[240px] border border-[#d8d8cb] rounded-[4px] overflow-hidden',
          className
        )}
      >
        <img
          src={props.src}
          alt={props.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  if (props.type === 'confirmation') {
    return (
      <div
        className={cn(
          'w-full bg-bg-success-light-hover border border-border-success rounded-[4px] py-6 px-6 text-center',
          className
        )}
      >
        <p className="text-base text-[#f8f8f3] leading-[1.1]">Your suggestion</p>
        <p className="text-2xl font-medium text-[#f8f8f3] leading-8 mt-0.5">
          {props.submittedName}
        </p>
      </div>
    );
  }

  // winner
  return (
    <div
      className={cn(
        'relative w-full h-[240px] bg-warm-orange border border-[#d8d8cb] rounded-[4px] flex flex-col items-center justify-center gap-4',
        className
      )}
    >
      <p className="font-light text-[30px] leading-9 text-brand-yellow">
        {props.winnerName}
      </p>
      <Badge className="border-[#d8d8cb] bg-transparent text-[#f8f8f3] rounded-full text-xs font-semibold gap-1">
        <HugeiconsIcon icon={Crown02Icon} size={16} />
        Crowned with {props.votes} votes
      </Badge>
    </div>
  );
}
```

- [ ] **Step 4: Create NameList component**

Create `src/components/composites/name-list.tsx`:

```tsx
import { NameListItem } from '@/components/primitives/name-list-item';
import type { QueenSuggestion } from '@/data/mock-queen-names';

interface NameListProps {
  suggestions: QueenSuggestion[];
  votedIds: Set<number>;
  maxVotesReached: boolean;
  onVoteToggle: (id: number) => void;
}

export function NameList({
  suggestions,
  votedIds,
  maxVotesReached,
  onVoteToggle,
}: NameListProps) {
  const sorted = [...suggestions].sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex flex-col w-full">
      {sorted.map((suggestion, index) => (
        <NameListItem
          key={suggestion.id}
          rank={index + 1}
          name={suggestion.name}
          votes={suggestion.votes}
          voted={votedIds.has(suggestion.id)}
          voteDisabled={maxVotesReached && !votedIds.has(suggestion.id)}
          onVoteToggle={() => onVoteToggle(suggestion.id)}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Create composite stories**

Create `src/stories/composites/QueenCard.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueenCard } from '@/components/composites/queen-card';

const meta: Meta<typeof QueenCard> = {
  title: 'Composites/QueenCard',
  component: QueenCard,
  decorators: [
    (Story) => (
      <div className="w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QueenCard>;

export const Light: Story = {
  args: {
    variant: 'light',
    children: (
      <div className="p-8 text-center text-foreground">Light card content</div>
    ),
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <div className="p-8 text-center text-[#f8f8f3]">Dark card content</div>
    ),
  },
};
```

Create `src/stories/composites/CardHeader.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from '@/components/composites/card-header';
import { HugeiconsIcon } from '@hugeicons/react';
import { Crown02Icon, CheckmarkBadge04Icon, ChampionIcon } from '@hugeicons/core-free-icons';
import cloudsAnimation from '@/assets/lottie/clouds.json';

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
    icon: <HugeiconsIcon icon={Crown02Icon} size={32} className="text-foreground-accent" />,
    title: 'Name the Queen',
    subtitle: 'Our hive has a new queen - help us give her a royal name.',
    variant: 'light',
    lottieData: cloudsAnimation,
    lottieHoverToPlay: true,
  },
};

export const SubmittedStep: Story = {
  args: {
    icon: <HugeiconsIcon icon={CheckmarkBadge04Icon} size={32} className="text-border-success" />,
    title: 'Name Submitted!',
    subtitle: 'Your suggestion has been added to the hive.',
    variant: 'dark',
    iconBorderColor: '#059669',
  },
};

export const WinnerStep: Story = {
  args: {
    icon: <HugeiconsIcon icon={ChampionIcon} size={32} className="text-foreground-accent" />,
    title: 'All Hail the Queen',
    subtitle: 'The hive has spoken. Our queen\'s name is...',
    variant: 'light',
  },
};
```

Create `src/stories/composites/CardMedia.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardMedia } from '@/components/composites/card-media';

const meta: Meta<typeof CardMedia> = {
  title: 'Composites/CardMedia',
  component: CardMedia,
  decorators: [
    (Story) => (
      <div className="w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardMedia>;

export const Image: Story = {
  args: {
    type: 'image',
    src: '/bee-specimen.jpg',
    alt: 'Bee specimen',
  },
};

export const Confirmation: Story = {
  args: {
    type: 'confirmation',
    submittedName: 'Queen Sting',
  },
  decorators: [
    (Story) => (
      <div className="bg-[#282824] w-[336px] p-3">
        <Story />
      </div>
    ),
  ],
};

export const Winner: Story = {
  args: {
    type: 'winner',
    winnerName: 'Empress Honeydew',
    votes: 12,
  },
};
```

Create `src/stories/composites/NameList.stories.tsx`:

```tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NameList } from '@/components/composites/name-list';
import { MOCK_SUGGESTIONS } from '@/data/mock-queen-names';

const meta: Meta<typeof NameList> = {
  title: 'Composites/NameList',
  component: NameList,
  decorators: [
    (Story) => (
      <div className="bg-[#282824] w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NameList>;

export const NoVotes: Story = {
  args: {
    suggestions: MOCK_SUGGESTIONS,
    votedIds: new Set<number>(),
    maxVotesReached: false,
    onVoteToggle: () => {},
  },
};

export const ThreeVotes: Story = {
  args: {
    suggestions: MOCK_SUGGESTIONS,
    votedIds: new Set([2, 4, 5]),
    maxVotesReached: true,
    onVoteToggle: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [votedIds, setVotedIds] = useState<Set<number>>(new Set());

    const handleToggle = (id: number) => {
      setVotedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else if (next.size < 3) {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <>
        <NameList
          suggestions={MOCK_SUGGESTIONS}
          votedIds={votedIds}
          maxVotesReached={votedIds.size >= 3}
          onVoteToggle={handleToggle}
        />
        {votedIds.size >= 3 && (
          <p className="text-center text-xs text-border-success py-2">
            You've used all 3 votes!
          </p>
        )}
      </>
    );
  },
};
```

- [ ] **Step 6: Add a placeholder bee image**

Download or create a placeholder image. For now, create a simple SVG placeholder:

```bash
mkdir -p public
```

Create `public/bee-specimen.jpg` — use any bee/honeycomb stock photo. For development, you can use a placeholder URL in the component and swap later.

- [ ] **Step 7: Verify all composite stories render**

```bash
bun run storybook
```

Expected: `Composites/` folder with QueenCard, CardHeader, CardMedia, NameList stories all rendering.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add composite components (QueenCard, CardHeader, CardMedia, NameList)"
```

---

## Task 12: NameTheQueen Screen (State Machine + All Steps)

**Files:**
- Create: `src/components/screens/name-the-queen.tsx`, `src/stories/screens/NameTheQueen.stories.tsx`

- [ ] **Step 1: Create the NameTheQueen state machine component**

Create `src/components/screens/name-the-queen.tsx`:

```tsx
import { useState } from 'react';
import { QueenCard } from '@/components/composites/queen-card';
import { CardHeader } from '@/components/composites/card-header';
import { CardMedia } from '@/components/composites/card-media';
import { NameList } from '@/components/composites/name-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LottieBackground } from '@/components/primitives/lottie-background';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Crown02Icon,
  CheckmarkBadge04Icon,
  ChampionIcon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
} from '@hugeicons/core-free-icons';
import {
  MOCK_SUGGESTIONS,
  MAX_VOTES,
  WINNER,
  type QueenSuggestion,
} from '@/data/mock-queen-names';
import cloudsAnimation from '@/assets/lottie/clouds.json';
import celebrationAnimation from '@/assets/lottie/celebration.json';

type FlowStep = 'INPUT' | 'SUBMITTED' | 'VOTING' | 'WINNER';

interface NameTheQueenProps {
  initialStep?: FlowStep;
}

export function NameTheQueen({ initialStep = 'INPUT' }: NameTheQueenProps) {
  const [step, setStep] = useState<FlowStep>(initialStep);
  const [nameInput, setNameInput] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [error, setError] = useState('');
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const [suggestions] = useState<QueenSuggestion[]>(MOCK_SUGGESTIONS);
  const [showMaxVotesMsg, setShowMaxVotesMsg] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);

  const maxVotesReached = votedIds.size >= MAX_VOTES;
  const isLight = step === 'INPUT' || step === 'WINNER';

  const handleSubmitName = () => {
    if (!nameInput.trim()) {
      setError('Please enter a name');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }
    setSubmittedName(nameInput.trim());
    setStep('SUBMITTED');
    setError('');
  };

  const handleVoteToggle = (id: number) => {
    setVotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setShowMaxVotesMsg(false);
        return next;
      }
      if (next.size < MAX_VOTES) {
        next.add(id);
        if (next.size === MAX_VOTES) {
          setShowMaxVotesMsg(true);
        }
        return next;
      }
      return prev;
    });
  };

  return (
    <QueenCard variant={isLight ? 'light' : 'dark'} className="w-full h-full">
      {/* Step: INPUT */}
      {step === 'INPUT' && (
        <>
          <div className="w-full">
            <CardHeader
              icon={
                <HugeiconsIcon
                  icon={Crown02Icon}
                  size={32}
                  className="text-foreground-accent"
                />
              }
              title="Name the Queen"
              subtitle="Our hive has a new queen - help us give her a royal name."
              variant="light"
              lottieData={cloudsAnimation}
              lottieHoverToPlay
            />
            <CardMedia type="image" src="/bee-specimen.jpg" alt="Bee specimen" />
          </div>
          <div className="flex flex-col gap-[22px] w-full px-3 py-6">
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Suggest a royal name..."
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (error) setError('');
                }}
                className={`bg-[#f8f8f3] border-[#d8d8cb] rounded-[var(--radius-input)] text-lg h-12 ${shakeInput ? 'animate-shake' : ''} ${error ? 'border-destructive' : ''}`}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <Button
              onClick={handleSubmitName}
              disabled={!nameInput.trim()}
              className="bg-brand-yellow text-foreground-accent rounded-[var(--radius-button)] h-12 w-full text-lg font-medium hover:bg-brand-yellow/90 disabled:opacity-50"
            >
              Continue
              <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setStep('VOTING')}
              className="text-base font-medium text-foreground"
            >
              View submitted names
            </Button>
          </div>
        </>
      )}

      {/* Step: SUBMITTED */}
      {step === 'SUBMITTED' && (
        <>
          <div className="w-full py-6">
            <CardHeader
              icon={
                <HugeiconsIcon
                  icon={CheckmarkBadge04Icon}
                  size={32}
                  className="text-border-success"
                />
              }
              title="Name Submitted!"
              subtitle="Your suggestion has been added to the hive."
              variant="dark"
              iconBorderColor="#059669"
            />
            <CardMedia type="confirmation" submittedName={submittedName} />
          </div>
          <div className="flex flex-col w-full px-3 py-6">
            <Button
              onClick={() => setStep('VOTING')}
              className="bg-brand-yellow text-[#282824] rounded-[var(--radius-button)] h-12 w-full text-lg font-medium hover:bg-brand-yellow/90"
            >
              {'🐝 View All Names & Votes'}
              <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
            </Button>
          </div>
        </>
      )}

      {/* Step: VOTING */}
      {step === 'VOTING' && (
        <>
          <div className="w-full py-6">
            <div className="flex flex-col items-center gap-6 px-3 py-10">
              <div className="flex items-center justify-center size-16 rounded-full border-[1.333px] border-[#f8f8f3]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-[#f8f8f3]"
                >
                  <rect
                    x="13"
                    y="4"
                    width="6"
                    height="23"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="5"
                    y="15"
                    width="6"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="21"
                    y="9"
                    width="6"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="4"
                    y1="27"
                    x2="28"
                    y2="27"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2 text-center w-full">
                <h3 className="font-light text-2xl leading-8 text-brand-yellow">
                  Queen Name Suggestions
                </h3>
                <p className="text-base leading-[1.1] text-[#f8f8f3]">
                  Upvote your favorites! The most popular name wins
                </p>
              </div>
            </div>
            <NameList
              suggestions={suggestions}
              votedIds={votedIds}
              maxVotesReached={maxVotesReached}
              onVoteToggle={handleVoteToggle}
            />
          </div>
          <div className="flex flex-col items-center w-full py-8 gap-2">
            {showMaxVotesMsg && (
              <p className="text-xs text-border-success">
                You've used all 3 votes!
              </p>
            )}
            <Button
              variant="ghost"
              onClick={() => setStep('WINNER')}
              className="text-base font-medium text-[#f8f8f3]"
            >
              Reveal the winner
            </Button>
          </div>
        </>
      )}

      {/* Step: WINNER */}
      {step === 'WINNER' && (
        <>
          <div className="w-full">
            <div className="relative flex flex-col items-center gap-4 w-full py-12 px-3 bg-gradient-to-b from-[var(--algray-200)] to-[var(--algray-50)]">
              <LottieBackground
                animationData={celebrationAnimation}
                blendMode="screen"
              />
              <div className="relative z-10 flex items-center p-4 rounded-full bg-white shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_1px_2px_rgba(40,40,36,0.1)]">
                <HugeiconsIcon
                  icon={ChampionIcon}
                  size={32}
                  className="text-foreground-accent"
                />
              </div>
              <div className="relative z-10 flex flex-col gap-2 text-center w-[312px]">
                <h3 className="font-light text-2xl leading-8 text-foreground-accent">
                  All Hail the Queen
                </h3>
                <p className="text-base leading-[1.1] text-foreground">
                  The hive has spoken. Our queen's name is...
                </p>
              </div>
            </div>
            <CardMedia
              type="winner"
              winnerName={WINNER.name}
              votes={WINNER.votes}
            />
          </div>
          <div className="flex flex-col w-full px-3 py-6">
            <Button
              variant="ghost"
              onClick={() => setStep('VOTING')}
              className="text-base font-medium text-foreground-accent opacity-50"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              Back to suggestions
            </Button>
          </div>
        </>
      )}
    </QueenCard>
  );
}
```

- [ ] **Step 2: Add shake animation to index.css**

Add to the end of `src/index.css`:

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}
```

- [ ] **Step 3: Create NameTheQueen stories**

Create `src/stories/screens/NameTheQueen.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NameTheQueen } from '@/components/screens/name-the-queen';

const meta: Meta<typeof NameTheQueen> = {
  title: 'Screens/NameTheQueen',
  component: NameTheQueen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen bg-[#e8e8dd] p-6">
        <div className="w-[336px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NameTheQueen>;

export const InputStep: Story = {
  args: {
    initialStep: 'INPUT',
  },
};

export const SubmittedStep: Story = {
  args: {
    initialStep: 'SUBMITTED',
  },
};

export const VotingStep: Story = {
  args: {
    initialStep: 'VOTING',
  },
};

export const WinnerStep: Story = {
  args: {
    initialStep: 'WINNER',
  },
};

export const FullFlow: Story = {
  args: {
    initialStep: 'INPUT',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive flow — type a name, submit, vote on suggestions, and reveal the winner.',
      },
    },
  },
};
```

- [ ] **Step 4: Verify all screen stories render and the interactive flow works**

```bash
bun run storybook
```

Expected: `Screens/NameTheQueen/` shows InputStep, SubmittedStep, VotingStep, WinnerStep, and FullFlow. The FullFlow should be fully interactive — type a name, click Continue, view votes, vote up to 3, reveal winner.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add NameTheQueen screen with 5-step state machine and all stories"
```

---

## Task 13: GitHub Repository + Vercel Deployment

**Files:**
- Create: `vercel.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create vercel.json**

Create `vercel.json`:

```json
{
  "buildCommand": "bun run build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "bun install",
  "framework": null
}
```

- [ ] **Step 2: Update .gitignore**

Ensure `.gitignore` includes:

```
node_modules/
dist/
storybook-static/
.superpowers/
```

- [ ] **Step 3: Create GitHub repository**

```bash
gh repo create alveole-storybook --public --source=. --remote=origin
```

- [ ] **Step 4: Push to GitHub**

```bash
git add -A
git commit -m "chore: add Vercel config and gitignore"
git push -u origin main
```

- [ ] **Step 5: Create Vercel project**

```bash
bunx vercel --yes
```

Follow prompts to link to the `alveole-storybook` GitHub repo. Or use the Vercel dashboard to import the repo.

- [ ] **Step 6: Verify build works locally**

```bash
bun run build-storybook
```

Expected: `storybook-static/` directory created with no errors.

- [ ] **Step 7: Trigger Vercel deployment**

```bash
git push
```

Expected: Vercel auto-deploys. Check the Vercel dashboard for the deployment URL.

- [ ] **Step 8: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: finalize deployment setup"
git push
```

---

## Self-Review Checklist

- **Spec coverage:** All sections covered — project setup (Tasks 1-5), design tokens (Task 3), component tree (Tasks 6-11), all 5 steps (Task 12), mock data (Task 7), Lottie animations (Task 8), error states (Task 12), responsive viewports (Task 4), deployment (Task 13).
- **Placeholder scan:** No TBDs. Lottie JSON files have functional placeholder content. Bee specimen image needs a real photo — noted in Task 11 Step 6.
- **Type consistency:** `QueenSuggestion` type defined in Task 7, used in Tasks 10, 11, 12. `FlowStep` type defined and used consistently in Task 12. `VoteToggle` props (`votes`, `voted`, `disabled`, `onToggle`) match between Task 9 definition and Task 10/11 usage.
