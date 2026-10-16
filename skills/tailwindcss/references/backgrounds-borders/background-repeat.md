---
source: https://tailwindcss.com/docs/background-repeat
---

# background-repeat

Utilities for controlling the repetition of an element's background image.

## Signature / Usage

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat ..."></div>
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-x ..."></div>
<div class="bg-[url(/img/clouds.svg)] bg-center bg-no-repeat ..."></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-repeat` | `background-repeat: repeat;` |
| `bg-repeat-x` | `background-repeat: repeat-x;` |
| `bg-repeat-y` | `background-repeat: repeat-y;` |
| `bg-repeat-space` | `background-repeat: space;` |
| `bg-repeat-round` | `background-repeat: round;` |
| `bg-no-repeat` | `background-repeat: no-repeat;` |

## Notes

- `bg-repeat` repeats the image both vertically and horizontally; `bg-repeat-x` only horizontally; `bg-repeat-y` only vertically.
- `bg-repeat-space` repeats the image without clipping.
- `bg-repeat-round` repeats the image without clipping, stretching if needed to avoid gaps.
- `bg-no-repeat` prevents the image from repeating.
- Responsive: prefix with a breakpoint variant like `md:` (`bg-repeat md:bg-repeat-x`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-repeat.mdx` (fetched 2026-10-16).

```html
<div class="bg-repeat md:bg-repeat-x ...">
  <!-- ... -->
</div>
```

## Related

- [background-position](./background-position.md)
- [background-size](./background-size.md)
- [background-image](./background-image.md)
