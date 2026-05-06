# Sergio Cobos

Personal website for Sergio Cobos, Research Engineer working at the intersection of AI Engineering, LLMs, empirical Software Engineering, and open-source communities.

Built with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run build
```

## Structure

- `app/` — Next.js app routes and global styles.
- `components/` — website sections and UI components.
- `public/og-image.png` — social preview image for LinkedIn, X, WhatsApp, etc.

## Deployment

Designed for Vercel. The social metadata currently assumes:

```txt
https://sergio-cobos.vercel.app
```

If the Vercel project name or custom domain changes, update `metadataBase`, `openGraph.url`, and related metadata in `app/layout.tsx`.
