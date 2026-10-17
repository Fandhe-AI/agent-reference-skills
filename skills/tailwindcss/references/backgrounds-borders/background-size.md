---
source: https://tailwindcss.com/docs/background-size
---

# background-size

Utilities for controlling the background size of an element's background image.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)] bg-cover bg-center"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-contain bg-center"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-auto bg-center bg-no-repeat"></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-auto` | `background-size: auto;` |
| `bg-cover` | `background-size: cover;` |
| `bg-contain` | `background-size: contain;` |
| `bg-size-(<custom-property>)` | `background-size: var(<custom-property>);` |
| `bg-size-[<value>]` | `background-size: <value>;` |

## Notes

- `bg-cover` scales the image until it fills the background layer, cropping the image if needed.
- `bg-contain` scales the image to the outer edges without cropping or stretching.
- `bg-auto` displays the image at its default size.
- Custom value: use the `bg-size-[<value>]` syntax, for example `bg-size-[auto_100px]`. For CSS variables, use `bg-size-(--my-image-size)`, which is shorthand for `bg-size-[var(--my-image-size)]` that adds the `var()` function for you automatically.
- Responsive: prefix with a breakpoint variant like `md:` (`bg-auto md:bg-contain`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-size.mdx` (fetched 2026-10-16).

```html
<div class="bg-size-[auto_100px] ..."></div>
<div class="bg-size-(--my-image-size) ..."></div>
<div class="bg-auto md:bg-contain ..."></div>
```

## Related

- [background-position](./background-position.md)
- [background-repeat](./background-repeat.md)
- [background-image](./background-image.md)
