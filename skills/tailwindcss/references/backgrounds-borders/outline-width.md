---
source: https://tailwindcss.com/docs/outline-width
---

# outline-width

Utilities for controlling the width of an element's outline.

## Signature / Usage

```html
<button class="outline outline-offset-2 ...">Button A</button>
<button class="outline-2 outline-offset-2 ...">Button B</button>
<button class="outline-4 outline-offset-2 ...">Button C</button>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `outline` | `outline-width: 1px;` |
| `outline-<number>` | `outline-width: <number>px;` |
| `outline-(length:<custom-property>)` | `outline-width: var(<custom-property>);` |
| `outline-[<value>]` | `outline-width: <value>;` |

## Notes

- Applying on focus: prefix with a variant like `focus:*` to apply only in that state (`focus:outline-2`).
- Custom value: `outline-[2vw]`; for CSS variables `outline-(length:--my-outline-width)`, shorthand for `outline-[length:var(--my-outline-width)]`.
- Responsive: prefix with a breakpoint variant like `md:` (`outline md:outline-2`).
- Migration (v3 → v4): the `outline` utility now sets `outline-width: 1px` by default to be consistent with border and ring utilities, and all `outline-<number>` utilities default `outline-style` to `solid`, so there is no need to combine them with `outline` (`outline outline-2` becomes `outline-2`). See also outline-style for the `outline-none` / `outline-hidden` rename.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/outline-width.mdx` (fetched 2026-10-16).

```html
<button class="outline-offset-2 outline-sky-500 focus:outline-2 ...">Save Changes</button>
<div class="outline-[2vw] ..."></div>
<div class="outline-(length:--my-outline-width) ..."></div>
```

## Related

- [outline-color](./outline-color.md)
- [outline-style](./outline-style.md)
- [outline-offset](./outline-offset.md)
- [border-width](./border-width.md)
