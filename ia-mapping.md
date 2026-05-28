# IA Mapping Method

This is the method the agent follows when mapping a story beat to a slide primitive. It's also the instructions you'd use to package this as a shareable skill later.

## Inputs

- **A beat.** A sentence or short paragraph of what a slide should say or do. Plain prose, written by Kendrick.
- **The primitive menu.** The seven primitives in [`layouts/`](./layouts/README.md): `statement`, `metric`, `compare`, `sequence`, `claim-support`, `quote`, `divider`.

## Steps

For each beat, in order:

1. **Classify the rhetorical intent.** What is this beat *doing*? Asserting one focal claim? Naming a number? Setting two things side by side? Walking through an ordered process? Backing a claim with evidence? Setting a section break? Quoting someone? Pick the primitive whose *relationship* matches.

2. **State the read out loud, in one sentence.** Example: *"Beat 3 reads as a comparison of 2 contrasting worlds → `compare`, 2 cells, `as: card` because the cells benefit from contained treatment."* This is what Kendrick reviews; it has to be specific enough to evaluate without opening the rendered slide.

3. **Map to the primitive + params.** Pick the layout and fill in its props from the beat. For `compare`, prefer `as: plain` unless the cells are visually distinct contrasts that benefit from a contained treatment (rule of thumb: 2 contrasting worlds → `card`; N parallel options → `plain`).

4. **Slot the content verbatim.** Do not rewrite, compress, reorder, split, or merge the beat. The beat's words land in the layout's props as-is. If a beat names an embedded list ("X, Y, Z"), you may surface it as a `support[]` or `items[]` array — that renders the structure already present in the beat, it doesn't editorialize.

5. **Record the read in frontmatter.** Add `beat: <n>` and `read: "<the read>"` as frontmatter fields on the slide. They live on the slide, fix in one edit, and don't render. Phase 4 generates a summary table from them.

## Frontmatter format

Every mapped slide carries two metadata fields plus the layout-specific props:

```yaml
---
layout: <primitive>
beat: <n>
read: "<beat n reads as ... → primitive, params>"
<layout props>
---
```

Vue's `defineProps` ignores the `beat` and `read` fields (they fall through to `$attrs` and end up as harmless HTML attributes on the layout root — visible in DevTools, not rendered).

## Non-negotiable

- **You map structure, not story.** Story is sacred input.
- **If a beat is ambiguous, pick your best read, state it, and let Kendrick correct it.** Do not ask him to pre-classify — the whole point is to find out whether you can pick well from the beat alone.
- **If a beat wants a primitive that doesn't exist in the set of seven, do not add a new primitive.** Pick the closest-fitting one, state the read, and add a `wanted:` frontmatter line: `wanted: "<new-primitive-name>: <why>"`. Coverage gaps become data.

## Example (beat 1 from the sample story)

Beat: *"Most teams' decks look nothing like their product. Same company, two different brands."*

```yaml
---
layout: statement
beat: 1
read: "beat 1 reads as one focal claim about brand-deck dissonance; the second sentence is a punchline restatement, not separate evidence → statement"
text: "Most teams' decks look nothing like their product. Same company, two different brands."
---
```
