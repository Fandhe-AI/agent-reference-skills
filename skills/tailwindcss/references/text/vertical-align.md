---
source: https://tailwindcss.com/docs/vertical-align
---

# vertical-align

Utilities for controlling the vertical alignment of an inline or table-cell box.

## Signature / Usage

```html
<span class="inline-block align-baseline">The quick brown fox...</span>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `align-baseline` | `vertical-align: baseline;` |
| `align-top` | `vertical-align: top;` |
| `align-middle` | `vertical-align: middle;` |
| `align-bottom` | `vertical-align: bottom;` |
| `align-text-top` | `vertical-align: text-top;` |
| `align-text-bottom` | `vertical-align: text-bottom;` |
| `align-sub` | `vertical-align: sub;` |
| `align-super` | `vertical-align: super;` |
| `align-(<custom-property>)` | `vertical-align: var(<custom-property>);` |
| `align-[<value>]` | `vertical-align: <value>;` |

## Notes

- `align-baseline` aligns the baseline of an element with the baseline of its parent.
- `align-top` aligns the top of an element and its descendants with the top of the entire line.
- `align-middle` aligns the middle of an element with the baseline plus half the x-height of the parent.
- `align-bottom` aligns the bottom of an element and its descendants with the bottom of the entire line.
- `align-text-top` aligns the top of an element with the top of the parent element's font.
- `align-text-bottom` aligns the bottom of an element with the bottom of the parent element's font.
- Use the `align-[<value>]` syntax to set the vertical alignment based on a completely custom value:

```html
<span class="align-[4px] ...">
  <!-- ... -->
</span>
```

- For CSS variables, you can also use the `align-(<custom-property>)` syntax:

```html
<span class="align-(--my-alignment) ...">
  <!-- ... -->
</span>
```

This is just a shorthand for `align-[var(<custom-property>)]` that adds the `var()` function for you automatically.

- Prefix a `vertical-align` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<span class="align-middle md:align-top ...">
  <!-- ... -->
</span>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/vertical-align.mdx` (fetched 2026-10-16).

## Related

- [text-align](./text-align.md)
