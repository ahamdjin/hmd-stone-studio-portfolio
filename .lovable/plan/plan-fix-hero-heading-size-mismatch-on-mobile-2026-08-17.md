# Plan: Fix Hero Heading Size Mismatch on Mobile

## Goal
Make the two hero headline lines render at the same font size on mobile and at every breakpoint.

## Current State
- `src/components/hero.tsx` renders two headline lines:
  - Line 1 (`headlineTop`, e.g. "Architecture") uses Tailwind classes `text-5xl sm:text-7xl lg:text-9xl`.
  - Line 2 (`headlineMasked`, e.g. "& Interiors.") is styled by `src/index.css` class `.text-mask` with sizes:
    - 120px default
    - 96px at <= 1068px
    - 60px at <= 735px
- On mobile (< 640px): top line is 48px, masked line is 60px — they do not match.
- The sizes also diverge at 640–735px, 735–1024px, and 1024–1068px.

## Proposed Change
Replace the Tailwind responsive font classes on the `headlineTop` span with a CSS class that mirrors the `.text-mask` breakpoints exactly, so both lines stay the same size at every viewport width.

### Implementation Steps
1. Add a new CSS class (e.g. `.headline-top`) to `src/index.css` with the same breakpoint sizes as `.text-mask`:
   - 120px default
   - 96px at `max-width: 1068px`
   - 60px at `max-width: 735px`
2. In `src/components/hero.tsx`, replace `text-5xl font-bold tracking-tight text-white whitespace-nowrap sm:text-7xl lg:text-9xl` on the `headlineTop` span with `headline-top font-bold tracking-tight text-white whitespace-nowrap`.
3. Preserve the existing `font-bold`, `tracking-tight`, `text-white`, and `whitespace-nowrap` styles.

## Verification
- Run `bun run build` to confirm no TypeScript or build errors.
- Use the browser preview at mobile viewport to confirm both headline lines are visually the same size.

## Files to Modify
- `src/components/hero.tsx`
- `src/index.css`
