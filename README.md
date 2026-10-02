# Sonic Oracle: Homepage Concepts

Design exploration for [Sonic Oracle](https://sonicoracle.music), a music discovery app for Tidal, Qobuz, and YouTube Music.

This branch (`v8-gallery`) is a comparison gallery of every homepage version, v1 through v7, plus the live site before and after a cleanup pass. Static HTML and CSS, no build step, no framework.

## Local preview

```bash
npx serve .
```

## Structure

- `index.html`: the gallery page
- `assets/gallery.css`: gallery styling
- `assets/shots/`: desktop screenshots of each version (top of page and full page)
- `versions/<slug>/`: a self-contained copy of each version's site, taken from its branch. Slugs: `v1` (branch `main`), `v1-5`, `v2`, `v3`, `v4`, `v4-5`, `v5`, `v6`, `v7`
- `versions/live-today/` and `versions/live-cleanup/`: the saved live site and the cleaned-up version, copied from branch `v0` (`before/index.html` and `index.html`)
- `vercel.json`: preview-only redirects so root-relative links in the live-site copies (`/app`, `/blog`, `/terms`, icons) land on the real site

Each homepage version also lives on its own branch (`main`, `v1.5`, `v2`, `v3`, `v4`, `v4.5`, `v5`, `v6`, `v7`).
