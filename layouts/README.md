# Layout primitives

Seven structure-only Slidev layouts. Each primitive encodes a *relationship*, never a *style* — visual appearance comes from `@unbranded-ds/tokens`. Two primitives must never differ by style; only by what they say about their content.

| Primitive | Relationship | Props |
|---|---|---|
| `statement` | one focal claim, vast margins | `text`, `eyebrow?` |
| `metric` | one number + its context | `value`, `label`, `delta?` |
| `compare` | N parallel items, 2–4 | `items[]`, `as` ("plain" \| "card") |
| `sequence` | ordered/directional steps | `steps[]`, `direction` ("ltr" \| "ttb") |
| `claim-support` | one assertion + evidence beneath | `heading`, `support[]?` (or slot) |
| `quote` | attributed words, set apart | `text`, `attribution` |
| `divider` | section/chapter transition | `label`, `index?` (note: `title` is reserved by Slidev's frontmatter) |

## Token usage

Primitives consume `@unbranded-ds/tokens` exclusively via `var(--…)`. Available semantic names (light theme):

- Color: `--color-background`, `--color-foreground`, `--color-primary`, `--color-primary-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-border`
- Spacing: `--spacing-1` (0.25rem) through `--spacing-16` (4rem), numeric scale
- Radius: `--radius-sm` (0.25rem), `--radius-md` (0.375rem), `--radius-lg` (0.5rem), `--radius-full`
- Typography: `--typography-size-sm/base/lg/xl`, `--typography-weight-{normal,medium,semibold,bold}`, `--typography-leading-{tight,normal,relaxed}`

For slide-display sizes (where the typography scale tops out at `xl`/1.25rem), primitives use `calc(var(--typography-size-xl) * N)` to scale up. Multiplication preserves the type-scale link.

## Art direction

Slide frontmatter can pass a `class:` attribute. Vue's automatic `$attrs` forwarding lands it on the layout's root element. Combined with the unbranded-ds-backed Tailwind preset, this means utility-class decoration works on any slide — but **only token-backed utilities** (`bg-primary`, `text-muted-foreground`, `p-8`, `rounded-md`). Arbitrary-value utilities like `bg-[#ff0000]` or `p-[27px]` are off-token escape hatches and defeat the brand-coherence bet.

Example:

```yaml
---
layout: statement
text: This slide earns art direction.
class: bg-primary text-primary-foreground
---
```
