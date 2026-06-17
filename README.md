# Finna Studio -- Phase 1

Architecture, theme system, Color Lab, Archive, and Projects Diary.
8 components are fully wired. Phase 2 adds the remaining ~19 from
the master spec (Status Spine, Sparkline variants, Neon/Vaporwave
cards, The Vault, The Observatory, The Archive layout, and so on).

## Run
```
npm run dev
```
Open http://localhost:5173

## How theming works
Every color lives in `src/theme/tokens.ts` as a `ColorToken`
(hex + depth + lightness). `ThemeContext` writes the computed
values onto `:root` as CSS variables (`--finna-primary`, etc).
Components never hardcode hex -- they read `var(--finna-*)`.
The Color Lab edits depth/lightness sliders live and persists
to localStorage, with a 10-item history and 8 preset palettes.

## How tags work
Components carry a `tags: string[]` array instead of living in
one folder. The sidebar reads all tags across the library and
turns each into a filterable "Smart Collection". A component can
appear under multiple tags at once. Phase 2 will add user-defined
categories on top of this, but the tag system is the foundation
and does not need to change.

## Adding a phase 2 component
1. Add the spec to `src/data/library.ts`
2. Build the real component in `src/components/ui/`
3. Add a preview case in `src/components/previews/ComponentPreview.tsx`
4. Done -- it shows up in Archive, respects Color Lab, and is
   searchable and taggable automatically.
