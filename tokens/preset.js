/**
 * terminal-ui-theme / Tailwind v3 adapter
 *
 * Maps the tokens onto a Tailwind v3 preset so you get utilities like
 * bg-term-ground, border-term, rounded-term, text-term-h1.
 *
 * There is not one literal value in this file. Every entry is a var()
 * reference to a custom property declared in tokens.css, which stays the
 * single source of truth. Change a value there and both Tailwind versions
 * follow.
 *
 * Because the values are var() references, tokens.css has to be loaded for
 * anything here to resolve. Import it at the top of your stylesheet:
 *
 *   @import "./path/to/tokens/tokens.css";
 *   @tailwind base;
 *   @tailwind components;
 *   @tailwind utilities;
 *
 * Then in tailwind.config.js:
 *
 *   module.exports = {
 *     presets: [require("./path/to/tokens/preset.js")],
 *     content: ["./src/**\/*.{html,js,jsx,ts,tsx}"],
 *   };
 *
 * Two differences from the v4 adapter, both of them v3 being simpler:
 *
 *   borderWidth is a first-class theme key here, so the undocumented-namespace
 *   caveat in theme.css does not arise and no length: hint is needed.
 *
 *   gridTemplateColumns is also a first-class key, so the log row maps
 *   directly and the --columns-* multi-column trap documented in theme.css
 *   has no equivalent here.
 *
 * The glow is where v3 is the weaker of the two. boxShadow carries the edge
 * tiers, but v3 ships no textShadow theme key and no text-shadow utilities, so
 * the text tiers below are exposed as plugin-authored utilities rather than
 * through a namespace. They are named to match v4's: text-shadow-term-glow.
 *
 * One known limit of the var() approach: Tailwind's slash opacity modifiers
 * (bg-term-accent/50) cannot compute against a variable, so they do not work on
 * these colors. If you need a translucent accent, declare the alpha variant as
 * its own token in tokens.css.
 *
 * On Tailwind v4, use theme.css instead. This file is v3 only.
 */

const v = (name) => `var(--${name})`;

module.exports = {
  theme: {
    extend: {
      colors: {
        "term-ground": v("term-ground"),
        "term-surface": v("term-surface"),
        "term-surface-raised": v("term-surface-raised"),

        "term-ink": v("term-ink"),
        "term-ink-muted": v("term-ink-muted"),
        "term-ink-faint": v("term-ink-faint"),

        "term-line": v("term-line"),
        "term-line-strong": v("term-line-strong"),

        "term-accent": v("term-accent"),
        "term-accent-ink": v("term-accent-ink"),

        "term-ok": v("term-status-ok"),
        "term-warn": v("term-status-warn"),
        "term-fail": v("term-status-fail"),
        "term-info": v("term-status-info"),
        "term-idle": v("term-status-idle"),
        "term-status-ink": v("term-status-ink"),
      },

      // The edge tiers of the glow. No offset and no spread, so these read as
      // emission rather than as elevation, which is what a dark ground needs.
      boxShadow: {
        "term-glow": v("term-glow-edge-1"),
        "term-glow-2": v("term-glow-edge-2"),
      },

      borderRadius: {
        "term-none": v("term-radius-none"),
        term: v("term-radius"),
        "term-full": v("term-radius-full"),
      },

      borderWidth: {
        term: v("term-border-width"),
        "term-heavy": v("term-border-width-heavy"),
      },

      fontFamily: {
        "term-mono": v("term-font-mono"),
        "term-sans": v("term-font-sans"),
      },

      fontWeight: {
        "term-body": v("term-weight-body"),
        "term-medium": v("term-weight-medium"),
        "term-bold": v("term-weight-bold"),
      },

      fontSize: {
        "term-display": v("term-text-display"),
        "term-h1": v("term-text-h1"),
        "term-h2": v("term-text-h2"),
        "term-h3": v("term-text-h3"),
        "term-lead": v("term-text-lead"),
        "term-body": v("term-text-body"),
        "term-sm": v("term-text-sm"),
        "term-xs": v("term-text-xs"),
      },

      lineHeight: {
        "term-tight": v("term-leading-tight"),
        "term-snug": v("term-leading-snug"),
        "term-dense": v("term-leading-dense"),
        "term-body": v("term-leading-body"),
      },

      letterSpacing: {
        "term-tight": v("term-tracking-tight"),
        "term-wide": v("term-tracking-wide"),
      },

      spacing: {
        "term-1": v("term-space-1"),
        "term-2": v("term-space-2"),
        "term-3": v("term-space-3"),
        "term-4": v("term-space-4"),
        "term-6": v("term-space-6"),
        "term-8": v("term-space-8"),
        "term-12": v("term-space-12"),
        "term-16": v("term-space-16"),
        "term-24": v("term-space-24"),

        // The free-standing marks in assets/, so w-term-glyph exists here too.
        "term-glyph": v("term-glyph-size"),
      },

      maxWidth: {
        term: v("term-container"),
        "term-measure": v("term-measure"),
      },

      // The log row. Both shapes, so a page can widen the row to carry a
      // source column without retyping the track list.
      gridTemplateColumns: {
        "term-row": v("term-grid-row"),
        "term-row-wide": v("term-grid-row-wide"),
      },

      transitionTimingFunction: {
        term: v("term-ease"),
      },
    },
  },

  plugins: [
    // v3 has no textShadow theme key, so the text tiers of the glow are added
    // as utilities directly. Same names as the v4 adapter generates, so markup
    // moves between the two versions unchanged.
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-term-glow": { textShadow: v("term-glow-text-1") },
        ".text-shadow-term-glow-2": { textShadow: v("term-glow-text-2") },
        ".text-shadow-none": { textShadow: "none" },
      });
    },
  ],
};
