# Portfolio — Abdulhadi Nasir Bashir

A minimal, fast, single-page developer portfolio built with **Next.js 16 + Tailwind CSS 4**. Technical-minimal design, light/dark aware, no runtime dependencies beyond Next/React.

## Edit your content

**All text lives in one file: [`lib/content.ts`](./lib/content.ts).** Search it for `TODO` — you need to fill in:

- `profile.linkedin` — your LinkedIn URL (leave `""` to hide the link)
- `profile.location` — e.g. `"Kano, Nigeria"`
- The **live demo** and **GitHub** URLs for Transleto and RentFlow (currently `"#"` placeholders)

Everything else (projects, case studies, skills, the pitch) is editable there too.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

1. Push this `portfolio/` folder to its **own GitHub repo**.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset auto-detects **Next.js**; no environment variables needed. Deploy.
4. (Optional) Add a custom domain in the Vercel project settings.

## Design notes

- **Type:** IBM Plex Sans (body) + IBM Plex Mono (labels/meta), via `next/font`.
- **Color:** near-monochrome warm-neutral with a single vermilion accent; tokens in `app/globals.css`.
- **Theme:** follows system preference, with a manual toggle (persisted to `localStorage`, no flash on load).
- **Motion:** one restrained staggered load reveal; respects `prefers-reduced-motion`.
