# Alveole-Storybook: Name the Queen Flow

## Overview

A new Storybook project for the Alveole brand, starting fresh with the latest tooling. The first flow is "Name the Queen" — a 5-step interactive component where users suggest a name for a new bee queen, vote on suggestions, and reveal the winner. All data is mocked (no backend).

**Figma source:** https://www.figma.com/design/pej4Fg4hhwxTCVSh1IrkAb/Alveole-26Brand---Design-System-Foundations?node-id=81-619&m=dev

## Project Setup & Infrastructure

### Stack
- **Framework:** Vite 7 + React 19 + TypeScript
- **Storybook:** 10 (latest `@storybook/react-vite`)
- **Styling:** Tailwind CSS v4 + shadcn (standard preset, customized tokens)
- **Package manager:** bun
- **Animations:** `lottie-react`
- **Icons:** Hugeicons (`@hugeicons/react`, `@hugeicons/core-free-icons`)

### Deployment
- **GitHub:** New repo `alveole-storybook`
- **Vercel:** New project linked to the repo
  - Build command: `bun run build-storybook`
  - Output directory: `storybook-static`
  - Install command: `bun install`

### Responsive Viewports

Using Storybook 10's built-in viewport addon (`storybook/viewport`):

```ts
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

const alveoleViewports = {
  mobile:  { name: 'Mobile',  styles: { width: '375px',  height: '812px' } },
  tablet:  { name: 'Tablet',  styles: { width: '768px',  height: '1024px' } },
  desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
};
```

Plus a **Screens Breakpoint toolbar** decorator that wraps screen-level stories in a resizable container for in-story responsive testing.

## Design Tokens & Alveole Brand Theme

Override shadcn standard preset CSS variables in `index.css` to match the Alveole brand.

### Colors

| Token | Light mode (Steps 1, 5) | Dark mode (Steps 2-4) |
|-------|------------------------|----------------------|
| `--background` | `#f8f8f3` | `#282824` |
| `--foreground` | `#282824` | `#f8f8f3` |
| `--foreground-accent` | `#3e1915` | `#fdff91` |
| `--foreground-muted` | `#787664` | — |
| `--border` | `#d8d8cb` | `#59594d` |
| `--brand-yellow` | `#fdff91` | `#fdff91` |
| `--secondary-warm-orange` | `#db5012` | — |
| `--border-success` | `#059669` | `#059669` |
| `--background-success-light` | `rgba(5,150,105,0.15)` | `rgba(5,150,105,0.15)` |
| `--background-success-light-hover` | `rgba(5,150,105,0.2)` | `rgba(5,150,105,0.2)` |

Note: The dark mode in Steps 2-4 is component-internal (dark card background), not a global Storybook theme toggle.

### Typography — Inter

| Style | Weight | Size/Line-height |
|-------|--------|-----------------|
| `Alveole/h2` | Light 300 | 30px / 36px |
| `Alveole/h3` | Light 300 | 24px / 32px |
| `text-base/regular` | Regular 400 | 16px / 1.1 |
| `text-lg/regular` | Regular 400 | 18px / 28px |
| `text-lg/medium` | Medium 500 | 18px / 28px |
| `text-lg/semibold` | SemiBold 600 | 18px / 28px |
| `text-base/medium` | Medium 500 | 16px / 24px |
| `text-sm/medium` | Medium 500 | 14px / 20px |
| `text-xs/semibold` | SemiBold 600 | 12px / 16px |

### Spacing & Radius

| Token | Value |
|-------|-------|
| `--radius-xl` | 16px (cards) |
| `--radius-sm` | 4px |
| `--radius-xs` | 2px (buttons) |
| `--radius-input` | 6px |
| `--radius-full` | 400px (pills/circles) |
| `--padding-3xl` | 48px |
| `--padding-xxl` | 40px |
| `--padding-xl` | 32px |
| `--padding-lg` | 24px |
| `--padding-sm` | 16px |
| `--padding-xs` | 12px |
| `--padding-xxs` | 8px |

### Shadow

`shadow-sm`: `0px 1px 3px rgba(40,40,36,0.1), 0px 1px 2px -1px rgba(40,40,36,0.1)`

## Component Architecture

### Component Tree

```
NameTheQueen              — state machine wrapper, manages step transitions
  QueenCard               — shared card shell (rounded-xl, shadow, overflow-clip)
    CardHeader            — icon circle + title + subtitle + optional Lottie bg
    CardMedia             — image / confirmation / name list / winner reveal
    CardActions           — buttons and input area
  NameList                — sorted list of suggestions with vote counts
    NameListItem          — rank + name + vote toggle
  VoteToggle              — upvote button (default / voted states)
  LottieBackground        — wraps lottie-react player, positioned absolute
```

### State Machine

```
INPUT → (submit name) → SUBMITTED → (view names) → VOTING → (3 votes used) → VOTES_COMPLETE → (reveal) → WINNER
```

- Steps 3 & 4 are both the `VOTING` state. Step 4 is when `votesUsed === maxVotes` (3).
- Theme is determined by state: `INPUT` & `WINNER` = light, `SUBMITTED` / `VOTING` / `VOTES_COMPLETE` = dark.

### Story Hierarchy

```
Primitives/
  VoteToggle
  NameListItem
  LottieBackground
  Input (shadcn override)
  Button (shadcn override)
  Badge

Composites/
  QueenCard
  CardHeader
  CardMedia
  NameList

Screens/NameTheQueen/
  InputStep
  SubmittedStep
  VotingStep
  WinnerStep
  FullFlow (interactive — walks through all steps)
```

### Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (375px) | Fullscreen card, 100% width, scrollable content |
| Tablet (768px) | Centered card, max-w-400px, modal overlay |
| Desktop (1440px) | Sidebar card at 336px width, then modal on interaction |

## The 5 Steps in Detail

### Step 1 — Input (Light theme)

- **Header:** Gradient background (algray-200/50 → algray-50/50) with Lottie animation behind. Crown icon in white circle (shadow-sm). Title "Name the Queen" (h3, Light 300, foreground-accent). Subtitle describing the action.
- **Media:** Bee specimen photo (object-cover, border, radius-sm, 240px height).
- **Actions:**
  - Text input (placeholder "example@mail.com" — note: this is a name input despite the placeholder from Figma; we use placeholder "Suggest a royal name...").
  - "Continue →" button (brand-yellow background, radius-xs, 48px height). **Disabled at 50% opacity** when input is empty.
  - "View submitted names" text button below.
- **Error state:** If user clicks Continue with empty input → shake animation + red caption "Please enter a name".
- **Lottie:** Cloud/honeycomb organic shapes, subtle, behind the gradient header.

### Step 2 — Name Submitted (Dark theme)

- **Header:** Checkmark-badge icon in green-bordered circle (#059669). Title "Name Submitted!" (h3, foreground-accent yellow). Subtitle "Your suggestion has been added to the hive."
- **Media:** Green-tinted confirmation box (bg success/light-hover, border success). Shows "Your suggestion" label + submitted name (e.g., "Queen Sting") in medium weight.
- **Actions:** "View All Names & Votes →" button (brand-yellow, full width, with bee emoji).

### Step 3 — Voting: No Votes Used (Dark theme)

- **Header:** Stats/chart icon in white-bordered circle. Title "Queen Name Suggestions" (h3, foreground-accent yellow). Subtitle "Upvote your favorites! The most popular name wins."
- **Content:** List of 6 name suggestions, each row:
  - Rank number (or checkmark-badge icon for #1)
  - Name (semibold, 18px)
  - Vote toggle button (border #59594d, arrow-up icon, vote count in yellow)
  - Rows separated by border-bottom (#59594d)
- **Actions:** "Reveal the winner" text button at bottom.

### Step 4 — Voting: 3 Votes Used (Dark theme)

- Same layout as Step 3, but with 3 of the toggle buttons in **voted state**:
  - Green background (`rgba(5,150,105,0.15)`), green border (#059669)
  - Arrow icon and count text in green (#059669) instead of yellow
- Advisory message when 3rd vote is cast: "You've used all 3 votes!" (subtle banner/toast)
- "Reveal the winner" text button remains.

### Step 5 — Winner Reveal (Light theme)

- **Header:** Gradient background with Lottie animation (`mix-blend-screen`, more prominent/celebratory). Champion/trophy icon in white circle. Title "All Hail the Queen" (h3, foreground-accent). Subtitle "The hive has spoken. Our queen's name is..."
- **Media:** Orange block (`#db5012`, 240px height) displaying:
  - Winner name "Empress Honeydew" (h2, Light 300, color yellow #fdff91)
  - Badge: crown icon + "Crowned with 12 votes" (xs/semibold, border pill)
- **Actions:** "← Back to suggestions" text button (50% opacity).
- **Lottie:** Celebratory golden/particle animation with mix-blend-screen overlay.

## Mock Data

```ts
const MOCK_SUGGESTIONS = [
  { id: 1, name: 'Empress Honeydew', votes: 12 },
  { id: 2, name: 'Queen Cleopollen', votes: 9 },
  { id: 3, name: 'Lady Buzzworth', votes: 7 },
  { id: 4, name: 'Duchess Nectar', votes: 6 },
  { id: 5, name: 'Madame Hivemind', votes: 4 },
  { id: 6, name: 'Another', votes: 3 },
];

const USER_SUBMITTED_NAME = 'Queen Sting';
const MAX_VOTES = 3;
const WINNER = MOCK_SUGGESTIONS[0]; // Empress Honeydew
```

## Lottie Animations

- **Step 1:** Subtle clouds passing by, pushed slowly by the wind. Positioned absolute behind the header gradient. Normal blend mode. **Animation is paused by default and only plays on mouse hover** (lottie-react `isStopped`/`isPaused` controlled by `onMouseEnter`/`onMouseLeave`).
- **Step 5:** Celebratory golden particles/sparkle animation. Positioned absolute, `mix-blend-screen`. More prominent than Step 1.
- Source: Free Lottie JSON files from LottieFiles (bee/honeycomb themed), or create simple placeholders.
- Component: `LottieBackground` wraps `lottie-react`, takes `src` (JSON import) and `blendMode` prop.

## Error States

| Trigger | Behavior |
|---------|----------|
| Click Continue with empty input | Shake animation on input + red caption "Please enter a name" |
| Cast 3rd vote | Subtle banner/message: "You've used all 3 votes!" |
