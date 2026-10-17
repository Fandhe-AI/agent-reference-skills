---
source: https://ui.shadcn.com/docs/typeset
---

# Typeset

A styling system for HTML and rendered markdown, from blog posts to streaming chat. One CSS file (`typeset.css`) you own that styles everything inside a `typeset` container.

## Signature / Usage

Copy `typeset.css` (generated in the typeset builder at https://ui.shadcn.com/typeset) next to your main CSS file and import it after Tailwind:

```css
@import "tailwindcss";
@import "./typeset.css";
```

Wrap rendered markdown with `typeset` and your preset class:

```tsx
<div className="typeset typeset-docs">
  <YourMarkdownRenderer>{content}</YourMarkdownRenderer>
</div>
```

`typeset` turns the styles on. `typeset-docs` is the preset created in the builder.

Defaults and the three rhythm controls:

```css
.typeset {
  --typeset-font-body: inherit;
  --typeset-font-heading: var(--font-heading);
  --typeset-font-mono: var(--font-mono);

  --typeset-size: 1em; /* body font-size */
  --typeset-leading: 1.75; /* line-height */
  --typeset-flow: 1.25em; /* space between blocks */
}
```

Multiple presets in one app:

```css
.typeset-chat {
  --typeset-flow: 1em;
  --typeset-leading: 1.6;
}

.typeset-docs {
  --typeset-size: 15px;
  --typeset-flow: 1.5em;
}
```

```tsx
<div className="typeset typeset-chat">{message}</div>
<article className="typeset typeset-docs">{page}</article>
```

One-off change on the container:

```tsx
<article className="typeset [--typeset-flow:1.75em]">...</article>
```

Horizontal scroll for wide tables or blocks:

```tsx
<div className="typeset-scroll">
  <table>...</table>
</div>
```

Opt a component out (both options cover the component and everything inside it):

```tsx
<div className="typeset">
  <p>Styled prose.</p>
  <Card className="not-typeset">Untouched component.</Card>
</div>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--typeset-size` | CSS length | Base text size. `1em` follows the surrounding layout; bumped up a little on smaller screens. |
| `--typeset-leading` | CSS number | Space between lines (line-height). |
| `--typeset-flow` | CSS length | Space between blocks. Headings and other elements derive their spacing from it. |
| `--typeset-font-body` | font family | Body font family. Default `inherit`. |
| `--typeset-font-heading` | font family | Heading font family. Default `var(--font-heading)`. |
| `--typeset-font-mono` | font family | Monospace font family. Default `var(--font-mono)`. |
| `typeset` | class | Turns the styles on for a container. |
| `typeset-scroll` | class | Wrapper that scrolls a wide block horizontally. |
| `not-typeset` / `data-not-typeset` | class / attribute | Keeps a component and its subtree out of Typeset. |

## Notes

- Principles: size, leading, and flow are the only three controls; heading sizes, list indents, heading gaps, and rule spacing derive from them.
- Typeset sets no maximum width; the layout owns it. The Measure control in the builder adds a `max-width` to the wrapper.
- Colors, fonts, and radius come from your theme tokens; dark mode follows the same tokens. To loosen leading on dark surfaces: `.dark .typeset { --typeset-leading: 1.9; }`.
- Overrides: Typeset lives in the `components` layer and uses `:where()` for element selectors, so Tailwind utilities (e.g. `className="text-lg"` on a `<p>`) and plain CSS win without `!important`.
- Streaming stability: no forward-looking selectors (`:last-child`, `:has()`, `:empty` are left out of layout rules), spacing uses `margin-block-start` only, and table separators live on the cells being added.
- Comparison with `@tailwindcss/typography` (`prose`): Typeset sizes relative to the container, flips with your tokens (no `prose-invert`), accepts plain utilities as overrides, is designed for stable appends, and ships as one CSS file you own rather than an npm plugin. It borrows the `:where()` guard pattern and the `not-typeset` escape hatch (in the spirit of `not-prose`).
- Example custom presets from the docs: `.typeset-reading` (serif, `--typeset-size: 18px`, `--typeset-leading: 1.9`, `--typeset-flow: 2em`), `.typeset-compact` (`14px`, `1.6`, `1em`), `.typeset-large` (`16px`, `2`, `2em`).

## Related

- [Theming](./theming.md)
- [Dark Mode](./dark-mode.md)
