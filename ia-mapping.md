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
layout: claim-support
beat: 1
read: "two-beat — an observation about brand-deck dissonance followed by a one-line punchline that names the consequence → claim-support, with the punchline as slot-body prose beneath the assertion"
heading: "Most teams' decks look nothing like their product."
---

Same company, two different brands.
```

(First pass on this beat picked `statement`. Got corrected to `claim-support` in review because the giant centered claim treatment turned a two-sentence beat into a wall of bolded text. The slot-fallback pattern handles a single supporting sentence cleanly — when the supporting content is one continuous thought, use the slot; when it's a list of parallel sub-points, use `support[]`.)

## Running it on a deck

Start with your story in plain prose. One beat per paragraph or numbered item; the editorial work — what earns a slide, what gets cut, the sequence — is yours, before the agent sees anything.

Then in this repo:

1. Open Claude Code (or any fresh agent session) pointed at this directory.
2. Ask it to map your beats per `ia-mapping.md`. Paste your beat list in the same turn.
3. The agent rewrites [`slides.md`](./slides.md): one slide per beat, each with `beat:`, `read:`, `layout:`, and the primitive's props.
4. Run `pnpm dev` to walk the deck. Reads are visible in the slide source — fix any wrong ones by editing the frontmatter inline.
5. (Optional) Ask the agent to regenerate [`reads-summary.md`](./reads-summary.md) so you have a flat table of decisions to scan.

The point isn't to ship the deck the agent generated. The point is to find out whether the *reading* feels right on real prose and whether ~7 primitives cover the rhetorical shapes your writing throws at the method. If a beat wants a primitive that isn't here, the agent records a `wanted: "<name>: <why>"` field rather than building it — coverage gaps become data.
