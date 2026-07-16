# Ali Hadi Musawa — Portfolio

A responsive, data-driven portfolio built with Next.js, React, TypeScript,
Motion, and CSS Modules.

## Technology stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- CSS Modules and global CSS
- Motion for animation
- Lucide React for icons
- `next/image` and WebP assets for responsive images
- `next/font` with Inter Tight and Geist Mono

## Prerequisites

Install the following before setting up the project:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20.9 or newer
- npm, which is included with Node.js

The project is currently tested with Node.js 22 and npm 11. Use npm for this
repository because `package-lock.json` is the source of truth for dependency
versions. Avoid mixing npm with Yarn or pnpm lockfiles.

## Set up on a new machine

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd my-portfolio
```

Install the exact dependency versions from the lockfile:

```bash
npm ci
```

No environment variables are currently required. If they are introduced later,
place local values in `.env.local`; environment files are intentionally ignored
by Git.

## Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The default development command uses Webpack because it provides reliable file
watching across the environments in which this project has been tested. To try
the default Next.js Turbopack development server instead, run:

```bash
npm run dev:turbo
```

## Run a production build locally

Build and start the optimized application:

```bash
npm run build
npm run start
```

The production server is available at
[http://localhost:3000](http://localhost:3000) by default.

To use a different port on macOS or Linux:

```bash
PORT=8080 npm run start
```

On Windows PowerShell:

```powershell
$env:PORT=8080
npm run start
```

> **Build requirement:** `next/font` downloads Inter Tight and Geist Mono while
> building. The build environment therefore needs internet access to Google
> Fonts. The generated production application serves the font files itself.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Webpack development server |
| `npm run dev:turbo` | Start the Turbopack development server |
| `npm run lint` | Check the source with ESLint |
| `npx tsc --noEmit` | Check TypeScript types without generating files |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |

Before deploying or opening a pull request, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Editing portfolio content

Most content can be updated without changing component markup:

| File | Content |
| --- | --- |
| `app/sections/site.data.ts` | Identity, navigation, hero, résumé, and contact details |
| `app/sections/experience.data.ts` | Professional experience timeline |
| `app/sections/projects.data.ts` | Projects, galleries, links, and technologies |
| `app/sections/about.data.ts` | Metrics, credentials, research, education, and organizations |

The arrays in these files are templates. Adding another education, experience,
project, credential, research, or organization entry automatically reuses the
corresponding interface.

Store images in `public/image`. Project screenshots should preferably use WebP
and follow this convention:

```text
projectName_slide1.webp
projectName_slide2.webp
projectName_slide3.webp
```

Then update the project entry in `app/sections/projects.data.ts`.

## Project structure

```text
app/
├── components/          Shared interactive components
├── lib/                 Shared formatting utilities
├── sections/            Portfolio sections, data, and CSS Modules
│   ├── about/           Reusable About-section renderers
│   └── experience/      Small client-side animation components
├── globals.css          Global variables and browser resets
├── layout.tsx           Fonts, metadata, and root layout
└── page.tsx             Page composition
public/
└── image/               Profile, logo, icon, and project assets
```

Static content is rendered with Server Components where possible. Small Client
Components handle the header, cursor, animations, galleries, and disclosure
controls.

## Deployment

Vercel is the recommended host because it supports this Next.js configuration
and `next/image` without additional changes:

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository at [vercel.com](https://vercel.com/).
3. Keep the automatically detected Next.js build settings.
4. Deploy the project.

No output-directory override or environment variables are currently required.
Each push to the production branch will trigger a new deployment.

This project should not be uploaded directly to a basic static host without
additional configuration. A static export requires an `output: "export"`
configuration and an alternative image loader because the current site uses the
default Next.js image optimizer.

## Troubleshooting

### The installed Node.js version is too old

Check the version:

```bash
node --version
```

Install Node.js 20.9 or newer, then run `npm ci` again.

### Dependencies or the Next.js cache are corrupted

On macOS or Linux:

```bash
rm -rf node_modules .next
npm ci
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, .next
npm ci
```

### A production build cannot download the fonts

Confirm that the environment can access `fonts.googleapis.com` and
`fonts.gstatic.com`, then rerun `npm run build`. A fully offline deployment
would require replacing `next/font/google` with locally stored font files.

### The browser does not update after saving a file

Stop the development server and restart it with:

```bash
npm run dev
```

The Webpack command is retained specifically as the reliable file-watching
fallback for this project.

### Port 3000 is already in use

Stop the existing process or start development on another port:

```bash
npm run dev -- -p 3001
```
