---
source: https://tailwindcss.com/docs/outline-offset
---

# outline-offset

Utilities for controlling the offset of an element's outline.

## Signature / Usage

```html
<button class="outline-2 outline-offset-0 ...">Button A</button>
<button class="outline-2 outline-offset-2 ...">Button B</button>
<button class="outline-2 outline-offset-4 ...">Button C</button>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `outline-offset-<number>` | `outline-offset: <number>px;` |
| `-outline-offset-<number>` | `outline-offset: calc(<number>px * -1);` |
| `outline-offset-(<custom-property>)` | `outline-offset: var(<custom-property>);` |
| `outline-offset-[<value>]` | `outline-offset: <value>;` |

## Notes

- Custom value: `outline-offset-[2vw]`; for CSS variables `outline-offset-(--my-outline-offset)`, shorthand for `outline-offset-[var(--my-outline-offset)]`.
- Responsive: prefix with a breakpoint variant like `md:` (`outline md:outline-offset-2`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/outline-offset.mdx` (fetched 2026-10-16).

```html
<div class="outline-offset-[2vw] ..."></div>
<div class="outline-offset-(--my-outline-offset) ..."></div>
<div class="outline md:outline-offset-2 ..."></div>
```

## Related

- [outline-width](./outline-width.md)
- [outline-color](./outline-color.md)
- [outline-style](./outline-style.md)
