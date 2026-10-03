# Sonic Oracle: V0 cleanup pass on the live homepage

A before/after of the current sonicoracle.music homepage. Open `/before/` for the live page as it stood on 2026-10-01, and `/` for the cleaned version.

This branch (`v0.5`) is `v0` with one change: the four stats beside the headline show the label first and the value second ("Discovery time", then "In seconds"), and the values line up across each row. Everything else matches `v0`.

## Files

- `before/index.html`: the live page, saved byte for byte.
- `index.html`: the cleaned-up version. One file with inline CSS and JS, like the original, so it drops straight onto the real site.
- `vercel.json`: preview-only redirects so links such as `/app` and `/blog` land on the live site instead of a 404.

Static HTML and CSS, no build step. Preview with `npx serve .`.

## What changed

The work followed the order in the critique: layout, spacing, and hierarchy with color stripped out first, then color, then motion. Each stage is its own commit.

### Layout and spacing

- Most sections had their side padding zeroed by a later `padding: X 0` rule, which is why cards ran to the edge of the screen on mobile. A single section model now keeps a 20px minimum gutter at every width.
- Vertical gaps were stacked 60 to 100px paddings on every section, and three text-only sections each carried their own. Section spacing is now one token, and the text-only sections are two-column rows. At 1440px wide the page drops from 5,579px to 4,821px tall. At 390px wide it stays about level (7,122px to 7,167px), because the type is larger and cards stack.

### Hierarchy and type

- Header: Log in is the one filled button; Blog is a text link. Both were identical gold buttons.
- Hero: "See it in action" is the primary button; "See pricing" is a text link. The stats sit in a boxed panel beside the headline as a counterweight.
- Headings and text are left-aligned.
- The step numbers were drawn at 8% opacity. They are now visible numerals, and the three decorative icons are gone.
- Body text is 17px. On mobile, step text was 12.75px and section labels 10px, because the root size dropped to 15px there. Nothing is under 14px now.

### Color

- Light warm background, the site's own navy (#0c1220) as text color, blue (#2a4bb0) for actions, step numerals, and the featured price card.
- Gold stays in the logo bars and the "can't find" headline accent, using a darker gold for text so it clears 5:1.
- Every text pair measures 5.3:1 or better. The glows, gradients, noise texture, and pulsing badge are removed.

### Motion

- Sections fade up once on scroll and stay put when you scroll back. The page is fully visible without JavaScript, and with reduced motion on.
- The logo bars keep their wave.
- Scrolling down shrinks "Sonic Oracle" to "S O" in step with the scroll position; scrolling up brings it back. It stays full-width when reduced motion is on.

### Code

- 23 inline `style` attributes and 3 inline handlers are gone; every color, size, and space is a CSS custom property in one `:root` block.
- The signup form has a label and a status message, and handles a failed request. The unused `submitWaitlist` function is removed, as is the unclosed `.proof-inner` div.
- Skip link, landmarks, and a text hint on the link that opens in a new tab.
- Meta description no longer repeats "taste affinity" twice, and the og:title uses a colon instead of an em dash.

## Copy changes

Only wording flagged in the Pass 1 notes (AI-sounding words and developer terms). Product claims are untouched.

- Small uppercase labels above headings removed: How It Works, Why Sonic Oracle, Behind the Scene, The Adventure Dial, Works With Your Setup, From the Community, Pricing.
- Step 1: "maps its sonic fingerprint and listener patterns using our proprietary recommendation engine" became "looks at its sonic fingerprint and listener patterns with its own recommendation engine".
- Step 2: "ranked by taste affinity, not what's trending. Genre-aware filtering ensures every artist belongs" became "ranked by taste affinity. Trending doesn't enter into it. Genre-aware filtering makes sure every artist belongs".
- "Built on real listening data" became "Built on listening data". The paragraph under it drops "proprietary", "surface", and "real people".
- Adventure dial: "Essential surfaces" became "Essential covers"; "Run the same seed twice" became "Run the same search twice".
- Best tracks card: "matched to your seed" became "matched to what you searched for".
- Button text in sentence case: "See it in action", "Log in".

## Left alone, worth a decision

- The 97% track hit rate: where does it come from? The "In seconds" tile is a phrase with no measurement behind it.
- The first testimonial says "What you've designed and created from scratch". Changing it to "the Sonic Oracle team" needs the subscriber's permission.
- "not generic algorithms", "not sonic matching", and "not an artist" are contrast framings. They are the site's positioning, so they stay.
- The hero paragraph and the platform row both name Tidal, Qobuz, and YouTube Music.

## Open questions from the critique

- Which comes first, seeing the product in action or pricing? This pass picks "See it in action", with pricing one link away.
- Which header action leads? This pass picks Log in. Flipping it means swapping the classes on two links.
- Light and dark modes: this pass is light only. The tokens make a dark theme a values-only job.

## Preview notes

The signup form posts to `/api/waitlist`, which does not exist on previews, so it shows its error state there. Nothing in this repo sends data to the live site.
