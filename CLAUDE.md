# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quiver landing page built with Nuxt 4, Nuxt UI, and Nuxt Content. Single-page application that renders content from `content/index.yml` with a strict schema-validated structure.

## Commands

```bash
# Development
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Build for production
pnpm preview          # Preview production build locally

# Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
```

## Content Architecture

**Single Source of Truth**: All page content lives in `content/index.yml`. The page is rendered by `app/pages/index.vue` which queries this single YAML file.

**Schema Validation**: `content.config.ts` defines the complete Zod schema (`landingSchema`) that validates `content/index.yml`. The schema enforces:
- Required fields (title, description for most sections)
- Optional sections (team, investors, about, platform_logos)
- Nested schemas (createLinkSchema, createFeatureSchema, createBaseSchema)
- Image paths must use `/landing/` prefix for team/investor/testimonial assets

**Section Structure**: The landing page sections in order:
1. Hero (hero, integrations)
2. Benefits cards (benefits)
3. Feature tabs (custom inline in index.vue)
4. Features grid (features)
5. About (about)
6. Steps/How it works (steps)
7. Testimonials (testimonials)
8. CTA
9. About company (about)
10. Team (team) - 3 columns, members can have optional images
11. Investors (investors) - 5 columns, all members require images
12. Integrations marquee (platform_logos)
13. Final CTA (cta)

## Key Implementation Details

**Adding New Sections**:
1. Update `content.config.ts` landingSchema with new section schema
2. Add section data to `content/index.yml`
3. Add section rendering in `app/pages/index.vue`

**Team/Investor Patterns**: Both use similar structure:
- `UPageGrid` with `lg:grid-cols-X` for responsive columns
- `UPageCard` with header/title/footer slots
- `NuxtImg` for avatars with `size-16 rounded-full object-cover outline-2 -outline-offset-2 outline-white/20`
- LinkedIn buttons in footer using `variant="link" color="neutral"`

**MDC Integration**: Titles support markdown via `<MDC :value="section.title" />` to enable colored text spans like `[text]{.text-primary}`

**Image Optimization**: Uses `@nuxt/image` with `NuxtImg` component for automatic optimization

## ESLint Configuration

Stylistic rules in `nuxt.config.ts`:
- `commaDangle: 'never'` - No trailing commas
- `braceStyle: '1tbs'` - One True Brace Style

## Color Mode

App configured for light mode only (`colorMode.preference: 'light'`, `fallback: 'light'`)
