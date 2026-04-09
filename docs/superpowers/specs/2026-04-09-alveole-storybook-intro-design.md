# Alveole-Storybook: Default Intro Page

## Overview

Replace Storybook's generic default landing experience with a custom Alveole introduction page inspired by the Figma foundations file.

**Figma sources:**
- Cover inspiration: `node 4:51`
- Logo system: `node 38:4257`
- Brand foundations: `node 4:68`

The page should feel like a polished web landing page rather than a presentation slide or a dense internal token sheet.

## Goal

Create the default Storybook home page as a responsive Alveole brand intro that:

- establishes the design system visually on first load
- showcases the logo system in a way that supports recoloring for brand applications
- surfaces the core brand and neutral colors
- feels optimized for desktop web while remaining clean on tablet and mobile

## Product Decision

The intro page will be the default Storybook landing page, not a secondary docs page hidden in navigation.

## Recommended Approach

Use a custom Storybook docs-style landing page built with React and project CSS, then register it as the first/default page users see.

Why this approach:

- it keeps the experience inside Storybook rather than creating a separate app-only surface
- it gives us full control over layout and branding
- it is easier to maintain than trying to bend the stock Storybook welcome screen into shape

## Experience Design

### 1. Hero

The top section takes its cues from the Figma cover:

- dark teal background as the dominant canvas
- yellow headline and eyebrow
- soft gray supporting copy
- compact chapter pills referencing foundations, typography, layout, components, patterns, and screens

For web optimization, the hero should be adapted rather than copied literally:

- use a centered content container with generous horizontal breathing room
- allow headline wrapping for browser widths instead of presentation-frame sizing
- preserve the strong contrast and editorial feel while improving readability on smaller screens

### 2. Branding Section

Below the hero, add a three-card branding section based on the logo foundations:

- primary lockup
- brand icon
- secondary wordmark

Each card should demonstrate a different surface treatment and explain when that mark is used.

The logo rendering itself should support color changes so the branding section can show:

- logo on dark teal
- logo on yellow
- logo on light neutral

The implementation should prefer reusable inline SVG or React-rendered mark components rather than fixed bitmap screenshots, so the brand team can change mark colors through props or CSS variables.

### 3. Foundations Section

Add a concise foundations area focused on the basic branding palette from Figma.

Include:

- brand yellow `#FDFF91`
- brand teal `#006D6A`
- brand dark teal `#013331`
- brand ruby `#3E1915`
- brand light brown `#533D32`
- neutral black `#2A2C29`
- neutral white `#FFFFFF`
- neutral warm gray `#787664`
- neutral soft gray `#ECECE0`

This should feel like a curated web showcase, not a full token dump. Secondary and feedback colors can stay out of the default intro unless needed later.

## Layout & Responsiveness

### Desktop

- wide hero with strong visual hierarchy
- branding cards in a 3-column layout
- color swatches in a responsive grid

### Tablet

- reduce hero padding and heading scale
- allow branding cards to wrap to 2 columns then 1

### Mobile

- stack all major sections vertically
- keep cards readable without horizontal scrolling
- keep logo specimens centered and comfortably padded

## Component Boundaries

The page should be built from small reusable pieces:

- `StorybookIntroPage` or equivalent page wrapper
- `HeroChapters`
- `LogoMark` / `Wordmark` / `BrandIcon` components with color props
- `BrandingCard`
- `ColorSwatch`

This keeps the intro maintainable and makes the branding assets reusable elsewhere in Storybook.

## Styling Direction

Follow the project's existing setup and avoid introducing a new styling framework.

Use:

- React components
- existing global CSS approach
- project color tokens or CSS variables where practical

The visual tone should be:

- bold
- editorial
- calm
- premium

Avoid:

- generic docs-page layouts
- cramped token tables
- presentation-only dimensions that do not adapt to browser widths

## Storybook Integration

Implementation should make this page the default Storybook entry experience.

That likely means:

- adding a dedicated intro story or docs entry
- ordering it first in Storybook navigation
- ensuring it is the screen shown on initial load

If Storybook configuration requires a small index or sidebar ordering tweak, include that as part of the work.

## Accessibility

- maintain high contrast for all text and logo uses
- ensure decorative pills and swatches do not carry critical information alone
- preserve semantic heading order
- provide accessible labels where logo graphics are meaningful

## Testing & Verification

Verify:

- the page renders in Storybook without layout breakage
- the intro appears as the default/first landing page
- logo recoloring works across the branding section
- the layout remains strong on desktop and mobile widths

## Out of Scope

- full token documentation for every semantic token
- rebuilding the entire Figma foundations file in Storybook
- adding interactive theme switching beyond what the branding section needs
