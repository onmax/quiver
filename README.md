# Quiver Landing Page

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

AI-powered inventory planning platform landing page built with [Nuxt UI](https://ui.nuxt.com) and Nuxt Content.

## Content Structure

All page content is managed through `content/index.yml` with schema validation in `content.config.ts`. Sections include:
- Hero & integrations
- Benefits cards
- Features & feature tabs
- About & steps
- Testimonials (6 testimonials using UPageColumns)
- Team (6 members in 3 columns)
- Investors (5 members in 5 columns)
- Platform integrations
- CTA

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Code Quality

Run linting and type checking:

```bash
pnpm lint       # ESLint
pnpm typecheck  # TypeScript type checking
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
