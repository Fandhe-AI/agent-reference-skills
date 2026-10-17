---
source: https://tailwindcss.com/docs/outline-style
---

# outline-style

Utilities for controlling the style of an element's outline.

## Signature / Usage

```html
<button class="outline-2 outline-offset-2 outline-solid ...">Button A</button>
<button class="outline-2 outline-offset-2 outline-dashed ...">Button B</button>
<button class="outline-2 outline-offset-2 outline-dotted ...">Button C</button>
<button class="outline-3 outline-offset-2 outline-double ...">Button D</button>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `outline-solid` | `outline-style: solid;` |
| `outline-dashed` | `outline-style: dashed;` |
| `outline-dotted` | `outline-style: dotted;` |
| `outline-double` | `outline-style: double;` |
| `outline-none` | `outline-style: none;` |
| `outline-hidden` | `outline: 2px solid transparent; outline-offset: 2px;` |

## Notes

- `outline-hidden` hides the default browser outline on focused elements while still preserving the outline in forced colors mode. `outline-none` completely removes the default browser outline on focused elements. It is highly recommended to apply your own focus styling for accessibility when using either utility.
- Responsive: prefix with a breakpoint variant like `md:` (`outline md:outline-dashed`).
- Migration (v3 → v4): `outline-none` previously did not set `outline-style: none`; it set an invisible outline that still showed up in forced colors mode. It was renamed to `outline-hidden`, and a new `outline-none` now actually sets `outline-style: none`. Replace usages of `outline-none` with `outline-hidden` (`focus:outline-none` becomes `focus:outline-hidden`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/outline-style.mdx` (fetched 2026-10-16).

```html
<input class="focus:border-indigo-600 focus:outline-hidden" type="text" />
<textarea class="outline-none ..." placeholder="Leave a comment..." />
```

## Related

- [outline-width](./outline-width.md)
- [outline-color](./outline-color.md)
- [border-style](./border-style.md)
