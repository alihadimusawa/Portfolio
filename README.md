# Ali Hadi Musawa — Portfolio

A data-driven portfolio built with Next.js, React, TypeScript, Motion, and CSS
Modules.

## Editing portfolio content

Most updates do not require changing component markup:

- `app/sections/site.data.ts` — identity, navigation, hero, and contact details
- `app/sections/experience.data.ts` — work experience timeline
- `app/sections/projects.data.ts` — project cards, galleries, links, and tools
- `app/sections/about.data.ts` — metrics, credentials, research, education, and
  organization experience

Reusable renderers live beside their section. Project images belong in
`public/image`; the naming helper in `projects.data.ts` documents the gallery
convention.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`npm run dev:turbo` is also available when testing Turbopack; the default dev
command uses Webpack for consistent file watching in this workspace.
