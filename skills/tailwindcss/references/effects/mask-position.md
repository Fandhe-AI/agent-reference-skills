---
source: https://tailwindcss.com/docs/mask-position
---

# mask-position

Utilities for controlling the position of an element's mask image.

## Signature / Usage

```html
<div class="mask-top-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-center mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-top-left` | `mask-position: top left;` |
| `mask-top` | `mask-position: top;` |
| `mask-top-right` | `mask-position: top right;` |
| `mask-left` | `mask-position: left;` |
| `mask-center` | `mask-position: center;` |
| `mask-right` | `mask-position: right;` |
| `mask-bottom-left` | `mask-position: bottom left;` |
| `mask-bottom` | `mask-position: bottom;` |
| `mask-bottom-right` | `mask-position: bottom right;` |
| `mask-position-(<custom-property>)` | `mask-position: var(<custom-property>);` |
| `mask-position-[<value>]` | `mask-position: <value>;` |

## Notes

- Basic example: use utilities like `mask-center`, `mask-right`, and `mask-left-top` to control the position of an element's mask image (the prose uses `mask-left-top`; the utilities in the table are named `mask-top-left` etc.).
- `mask-radial-at-*` on `mask-image.md` sets the center of a radial gradient mask, not the mask image itself.

### Using a custom value

Use the `mask-position-[<value>]` syntax to set the mask position based on a completely custom value:

```html
<div class="mask-position-[center_top_1rem] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `mask-position-(<custom-property>)` syntax:

```html
<div class="mask-position-(--my-mask-position) ...">
  <!-- ... -->
</div>
```

This is just a shorthand for `mask-position-[var(<custom-property>)]` that adds the `var()` function for you automatically.

### Responsive design

Prefix a `mask-position` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-center md:mask-top ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-position.mdx` (fetched 2026-10-16).

## Related

- [mask-size](./mask-size.md)
- [mask-repeat](./mask-repeat.md)
- [mask-image](./mask-image.md)
- [background-position](../backgrounds-borders/background-position.md)
