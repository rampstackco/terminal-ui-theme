# Customizing: move along an axis

Most themes document customization as a list of variables you may set. That tells you what is editable and nothing about what to edit. This file documents it the other way round: pick the axis you want to move along, and change the two or three tokens that carry the move.

The axes are the four from the [creative direction framework](https://rampstack.co/framework/creative-direction), and they are the same four annotated throughout [`tokens/tokens.css`](tokens/tokens.css). Where this theme currently sits:

| Axis | Position |
| --- | --- |
| Tone register | [Professional](https://rampstack.co/framework/tone/professional) |
| Aesthetic philosophy | [Editorial Restrained](https://rampstack.co/framework/aesthetic/editorial-restrained) |
| Audience relationship | [Peer](https://rampstack.co/framework/relationship/peer) |
| Sensory ambition | [Considered](https://rampstack.co/framework/sensory/considered) |

Every move below is an edit to `tokens/tokens.css` only, except where it says otherwise. Nothing else in the repo holds a value.

One rule keeps these moves clean: change tokens on the axis you are moving, and leave the others alone. Reaching for the accent while you are doing a relationship move is how a theme ends up at no position at all.

---

## Move 1, worked: Audience relationship, insider toward approachable

This theme currently addresses someone who has used a terminal for years. It puts an unexplained `--all` flag in the hero, sets its headings in monospace, and gives its corners no radius worth the name. That is [Peer](https://rampstack.co/framework/relationship/peer) at the insider end: the interface assumes literacy rather than teaching it.

This move keeps the register and takes the gatekeeping out of it. It is the move to make when the same product has to land for a team lead evaluating it, a designer who will use it twice a month, or anyone who did not arrive already fluent. The destination is toward [Companion](https://rampstack.co/framework/relationship/companion), sitting beside the reader rather than assuming they are already in the room.

Three tokens carry it, and they are the three things a reader registers before they have read a sentence: how much of the page is monospace, how often it glows, and how sharp the corners are.

### 1. The monospace share

```diff
- --term-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
-   "Liberation Mono", "DejaVu Sans Mono", monospace;
+ /* unchanged */
```

The token does not move. What moves is which elements reach for it. Monospace headings are the strongest insider signal this theme has, and dropping them is most of the distance to Companion on its own. In `components/components.css`, three rules name `--term-font-mono` for display text rather than for data:

```diff
  .term-panel-title {
-   font-family: var(--term-font-mono);
+   font-family: var(--term-font-sans);
  }

  .term-nav-brand {
-   font-family: var(--term-font-mono);
+   font-family: var(--term-font-sans);
  }

  .term-btn {
-   font-family: var(--term-font-mono);
+   font-family: var(--term-font-sans);
  }
```

Leave `.term-log`, `.term-input`, `.term-chip` and `.term-label` alone. Those are data, and setting data in a proportional face is a legibility loss with nothing bought for it: a column of timestamps only lines up because the digits are the same width.

This is the one move in this file that edits a file other than `tokens.css`, and that is the honest report rather than a limitation being hidden. Which face a heading takes is not a value, it is a decision about which elements are display and which are data, and a token cannot hold that.

### 2. The glow frequency

```diff
- --term-glow-text-1: 0 0 6px color-mix(in srgb, currentColor 45%, transparent);
+ --term-glow-text-1: 0 0 5px color-mix(in srgb, currentColor 28%, transparent);
```

```diff
  --term-glow-text-2:
-   0 0 4px color-mix(in srgb, currentColor 60%, transparent),
-   0 0 14px color-mix(in srgb, currentColor 32%, transparent);
+   0 0 4px color-mix(in srgb, currentColor 38%, transparent),
+   0 0 12px color-mix(in srgb, currentColor 18%, transparent);
```

Glow is the theme telling the reader that something is live. An insider reads that as information; someone newer reads a page with four glowing things as a page that is alarmed about something. Dropping the alphas keeps the emphasis and takes the urgency out of it. The tiers stay two, because a third tier is a different problem.

### 3. The corners

```diff
- --term-radius: 2px;
+ --term-radius: 6px;
```

Two pixels is a character cell that has been very slightly softened. Six is a button. This is the smallest edit in the move and the one a reader will feel first, because corner radius is the relationship axis's most direct instrument: it is why the annotation on that group in `tokens.css` is about hierarchy with the reader rather than about corners.

Do not go past 8px. The register is built on sharp rectangles meeting hairlines, and at 10px and up the corners start rounding away from the rules they meet, so the rule ends before the corner does and the join reads as a rendering fault.

### What happens to the feel

The page keeps every mechanic that makes it this register. The grounds stay near-black, the accent stays phosphor, the log rows stay on their fixed tracks, the cursor still blinks. What goes is the sense that you have to already know what this is. Read the hero after the change and it sounds like a product with a sales page, rather than a tool that assumes you found it from a colleague.

### What three tokens cannot do

They cannot move the copy. `nightjar tail --all` is a Peer sentence and it will sit oddly on a Companion page no matter what the tokens say: an approachable page has to say what the flag does. The relationship axis runs through language before it runs through radius, and a token file has no opinion about a hero. Budget a copy pass alongside this move.

---

## Move 2, worked: Sensory ambition, Considered toward Functional

This one is a deletion, which is why it is worth naming. The theme ships a glow layer: two tiers of emphasis, the prompt and cursor marks, the section glyphs. That layer is what makes the register recognizable at a glance, and it is also the first thing that gets in the way when the interface is a console someone stares at for eight hours.

Delete two things:

```bash
rm -rf assets/
rm components/glow.css
```

Then drop the `glow.css` link from your pages and remove any markup carrying `term-glow`, `term-glow-2`, `term-glow-edge`, `term-lit`, `term-cursor`, `term-prompt`, `term-glyph` or `term-log-row-live` classes. Nothing else breaks. `tokens.css` and `components.css` have no dependency on the glow layer; the dependency runs one way only, which is what makes the deletion clean.

One thing does not survive the deletion, and it is worth knowing before you make it. `.term-panel-lead` in `components.css` uses `--term-glow-edge-2` directly, so the lead panel loses its glow and keeps only its heavier rule. That is the correct Functional outcome rather than a break: the panel is still marked, it is just marked structurally.

The glow tokens can stay in `tokens.css` or go with it. Leaving them costs nothing and means the move is reversible.

### What happens to the feel

The status colors still mean what they meant, the rows are still on their tracks, the contrast figures are unchanged, because none of them were ever carried by the glow. What goes is the sense that the screen is live. This is the right position for a dashboard on a wall, an admin surface, or anything a reader comes to in order to answer a question rather than to watch.

It is also the honest move if you like the structure of this register but do not want the theatre. Shipping the glow layer half-heartedly, one lit heading and no cursor, reads worse than either end: the page looks like it started down a road and stopped.

---

## Move 3, sketched: Aesthetic philosophy, dense toward spacious

The README names the one place this theme strains against its own position: [Editorial Restrained](https://rampstack.co/framework/aesthetic/editorial-restrained) is written around generous space, and a log pane is the densest thing on the web. This move takes the position at its usual density, which is the right call when the page is a marketing site rather than a console.

The tokens that carry it:

- `--term-row-pad-y`, from `var(--term-space-2)` up to `var(--term-space-3)` or `var(--term-space-4)`. This is the whole density dial for the log, and it is one line because the row is a token rather than a number retyped in three stylesheets.
- `--term-leading-dense`, `1.5` up toward `1.65`. At that point it has met `--term-leading-body` and you have one leading rather than two, which is a fair signal that the dense case has stopped being a case.
- `--term-measure`, `66ch` down toward `58ch`. Editorial Restrained composes negative space rather than leaving it over, and a shorter measure is what makes the space around a paragraph read as composed.

Work out for yourself what happens to `--term-grid-row`. The fixed time and level tracks are what make the list scannable, and a spacious page has fewer rows for the eye to travel. There is a right answer and finding it will teach you more about the register than reading about it.

---

## Move 4, sketched: the accent, green toward amber

Not an axis move, and included because it is the first thing most people will want. The phosphor lineage had more than one color, and amber is the other one people remember.

```diff
- --term-accent: #3fe07a;
+ --term-accent: #f0b53f;
```

That single line is most of it, and then you have a problem to solve, which is why this is sketched rather than worked. `--term-status-warn` is currently that exact amber, and `--term-status-ok` is a reference to the accent. Make the swap naively and ok and warn become the same color, so the two states the log most needs to tell apart stop being distinguishable.

You have two honest ways out. Move `--term-status-warn` to something the accent is not, keeping in mind that it has to stay clear of `--term-status-fail` as well, which leaves a narrow band. Or accept that in an amber register the accent cannot also be the ok state, and give `--term-status-ok` a green of its own, which is the reason the green build could avoid a fourth color and the amber build cannot.

Whichever you pick, re-measure. Every ratio in `tokens.css` is quoted against all three grounds and the worst of the three has to clear AA; a hue change moves all three at once.
