# Sonic Oracle: V0 cleanup pass on the live homepage

A before/after of the current sonicoracle.music homepage.

- `before/index.html`: the live page, saved byte for byte on 2026-10-01.
- `index.html`: the cleaned-up version.
- `vercel.json`: preview-only redirects so links such as `/app` and `/blog` land on the live site instead of a 404. The cleaned page keeps root-relative links, so it drops straight onto the real domain.

The page posts email signups to `/api/waitlist`. That endpoint does not exist on previews, so the form shows its error state there.

Static HTML and CSS, no build step. Preview with `npx serve .`.
