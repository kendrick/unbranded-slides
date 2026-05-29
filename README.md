```
◦◦    ◦◦ ◦◦    ◦◦ ◦◦◦◦◦◦◦  ◦◦◦◦◦◦◦     ◦◦    ◦◦    ◦◦ ◦◦◦◦◦◦   ◦◦◦◦◦◦◦◦ ◦◦◦◦◦◦
◦◦    ◦◦ ◦◦◦   ◦◦ ◦◦   ◦◦  ◦◦   ◦◦    ◦◦◦◦   ◦◦◦   ◦◦ ◦◦   ◦◦  ◦◦       ◦◦   ◦◦
◦◦    ◦◦ ◦◦◦◦  ◦◦ ◦◦   ◦◦  ◦◦   ◦◦   ◦◦  ◦◦  ◦◦◦◦  ◦◦ ◦◦    ◦◦ ◦◦       ◦◦    ◦◦
◦◦    ◦◦ ◦◦ ◦◦ ◦◦ ◦◦◦◦◦◦◦  ◦◦◦◦◦◦◦  ◦◦    ◦◦ ◦◦ ◦◦ ◦◦ ◦◦    ◦◦ ◦◦◦◦◦◦   ◦◦    ◦◦
◦◦    ◦◦ ◦◦  ◦◦◦◦ ◦◦   ◦◦  ◦◦ ◦◦    ◦◦◦◦◦◦◦◦ ◦◦  ◦◦◦◦ ◦◦    ◦◦ ◦◦       ◦◦    ◦◦
◦◦    ◦◦ ◦◦   ◦◦◦ ◦◦   ◦◦  ◦◦  ◦◦   ◦◦    ◦◦ ◦◦   ◦◦◦ ◦◦   ◦◦  ◦◦       ◦◦   ◦◦
 ◦◦◦◦◦◦  ◦◦    ◦◦ ◦◦◦◦◦◦◦  ◦◦   ◦◦  ◦◦    ◦◦ ◦◦    ◦◦ ◦◦◦◦◦◦   ◦◦◦◦◦◦◦◦ ◦◦◦◦◦◦
                                                 u n b r a n d e d ◦ s l i d e s
```

# unbranded-slides

A Slidev-based proof-of-concept for slide decks built from tokens and structural primitives. Seven structure-only Vue layouts consume [`@unbranded-ds/tokens`](https://github.com/kendrick/unbranded-ds/tree/main/packages/tokens) for color, type, spacing, and radius. Tailwind v4 utilities resolve to the same CSS variables, so any utility class you reach for is already a token reference. An LLM-driven IA-mapping method sits on top as an optional layer.

## Status

Proof-of-concept. The substrate (primitives, token wiring, Slidev pipeline) is shipped and works for real decks. The IA-mapping method that maps plain-prose story beats to primitives is documented in [`ia-mapping.md`](./ia-mapping.md) and is **work in progress**. Don't treat the mapping as load-bearing; the substrate is the part you'd reach for.

## Quickstart

```bash
pnpm install
pnpm dev
```

Slidev opens at `http://localhost:3030`. Edits to [`slides.md`](./slides.md) hot-reload.

A demo deck with one slide per primitive (plus an art-directed example) lives at [`demo.md`](./demo.md):

```bash
pnpm dev:demo
```

## The primitives

Seven Slidev custom layouts in [`layouts/`](./layouts/), each ~30-50 lines of Vue. Each one encodes a *relationship*, never a *style*. Visual appearance comes from tokens. Two primitives should never differ by style, only by what they say about their content.

| Primitive       | Relationship                       | Props                                                     |
| --------------- | ---------------------------------- | --------------------------------------------------------- |
| `statement`     | one focal claim, vast margins      | `text`, `eyebrow?`                                        |
| `metric`        | one number + its context           | `value`, `label`, `delta?`                                |
| `compare`       | N parallel items, 2–4              | `items[]`, `as` (`plain` \| `card`)                       |
| `sequence`      | ordered/directional steps          | `steps[]`, `direction` (`ltr` \| `ttb`)                   |
| `claim-support` | one assertion + evidence beneath   | `heading`, `support[]?` (or slot)                         |
| `quote`         | attributed words, set apart        | `text`, `attribution`                                     |
| `divider`       | section transition                 | `label`, `index?` (`title` is reserved by Slidev)         |

The set is deliberately small. If a real beat wants a primitive that isn't here, log the gap rather than building a new one. Coverage gaps become data. [`layouts/README.md`](./layouts/README.md) has the available token names and the art-direction convention.

## Tokens

Tokens come from [`@unbranded-ds/tokens`](https://github.com/kendrick/unbranded-ds/tree/main/packages/tokens) as a pnpm dependency. The light theme's CSS variables flow through to the primitives via `var(--color-foreground)`, `var(--color-primary)`, `var(--spacing-8)`, and the rest of the scale.

Tailwind v4 utilities (`bg-primary`, `text-foreground`, `p-8`, `rounded-md`) resolve to the same variables, so they can't drift off-token unless you reach for an arbitrary-value escape hatch.

[`style.css`](./style.css) imports the preset and theme. [`setup/main.ts`](./setup/main.ts) sets `data-theme="light"` on the document root so the theme values apply. A precompile step via `@tailwindcss/cli` runs automatically before `dev`, `build`, and `export`. Tailwind's Vite plugin choked on Slidev's internal CSS (which uses `@apply` with UnoCSS utilities Tailwind v4 doesn't know), so precompiling was the path around it.

To swap themes, change which theme CSS gets imported in `style.css` (`light.css`, `dark.css`, `brand.css`) and update the `data-theme` attribute in `setup/main.ts`.

## Art direction

Slide frontmatter can pass a `class:` attribute. Vue's `$attrs` forwarding lands it on the layout's root element, so utility classes layer cleanly on top of any primitive:

```yaml
---
layout: statement
text: This slide earns art direction.
class: bg-primary text-primary-foreground
---
```

The Tailwind config consumes only the unbranded-ds preset, so every utility is token-backed. Don't reach for arbitrary-value utilities (`bg-[#ff0000]`, `p-[27px]`) in slide source. Those are off-token escape hatches and defeat the brand-coherence bet.

## IA mapping (work in progress)

The substrate above is the part of this POC that's settled. The IA-mapping method (an agent reading a plain-prose story beat and picking the primitive whose relationship matches) lives in [`ia-mapping.md`](./ia-mapping.md). It's been tested on a six-beat sample story: five of six hit a defensible primitive on the first pass, one got corrected in review. Two open findings:

- **Primitive coverage skewed.** Four of six sample beats land on `claim-support`. Either the prose runs heavy on assertion+kicker constructions (a voice signal) or `claim-support`'s boundary absorbs work `statement` should hold. Needs more decks to tell.
- **Prose-first assumption.** The method needs beats: short plain-prose paragraphs, one per intended slide. Existing decks are slide-first artifacts, so testing on them takes a bridging step (the "napkin exercise" in [`ia-mapping.md`](./ia-mapping.md#running-it-on-a-deck)). That gap might matter more than the primitive set itself.

To run it on a deck: write your story in plain prose first, then ask Claude Code (or any agent) in this directory to map your beats per `ia-mapping.md`. The agent rewrites [`slides.md`](./slides.md) with one slide per beat; each gets `beat:`, `read:`, `layout:`, and the primitive's props. Walk the deck with `pnpm dev` and fix wrong reads by editing the frontmatter inline. The full recipe is in [`ia-mapping.md`](./ia-mapping.md#running-it-on-a-deck).

## Building and exporting

```bash
pnpm build      # static SPA in dist/
pnpm export     # PDF at slides-export.pdf
```

The PDF export uses Playwright's headless chromium. First run installs it via `pnpm exec playwright install chromium`; the `playwright-chromium` package is already a dev dependency.

## License

MIT
