---
source: https://tailwindcss.com/docs/background-position
---

# background-position

Utilities for controlling the position of an element's background image.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)] bg-top-left"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-top"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-top-right"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-left"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-center"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-right"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-left"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-bottom"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-right"></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-top-left` | `background-position: top left;` |
| `bg-top` | `background-position: top;` |
| `bg-top-right` | `background-position: top right;` |
| `bg-left` | `background-position: left;` |
| `bg-center` | `background-position: center;` |
| `bg-right` | `background-position: right;` |
| `bg-bottom-left` | `background-position: bottom left;` |
| `bg-bottom` | `background-position: bottom;` |
| `bg-bottom-right` | `background-position: bottom right;` |
| `bg-position-(<custom-property>)` | `background-position: var(<custom-property>);` |
| `bg-position-[<value>]` | `background-position: <value>;` |

## Notes

- Custom value: use the `bg-position-[<value>]` syntax to set the background position based on a completely custom value, for example `bg-position-[center_top_1rem]`. For CSS variables, use `bg-position-(--my-bg-position)`, which is shorthand for `bg-position-[var(--my-bg-position)]` that adds the `var()` function for you automatically.
- Responsive: prefix with a breakpoint variant like `md:` (`bg-center md:bg-top`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-position.mdx` (fetched 2026-10-16).

```html
<div class="bg-position-[center_top_1rem] ..."></div>
<div class="bg-position-(--my-bg-position) ..."></div>
<div class="bg-center md:bg-top ..."></div>
```

## Related

- [background-size](./background-size.md)
- [background-repeat](./background-repeat.md)
- [background-origin](./background-origin.md)
