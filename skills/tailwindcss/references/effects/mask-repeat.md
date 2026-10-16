---
source: https://tailwindcss.com/docs/mask-repeat
---

# mask-repeat

Utilities for controlling the repetition of an element's mask image.

## Signature / Usage

```html
<div class="mask-repeat mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-repeat` | `mask-repeat: repeat;` |
| `mask-no-repeat` | `mask-repeat: no-repeat;` |
| `mask-repeat-x` | `mask-repeat: repeat-x;` |
| `mask-repeat-y` | `mask-repeat: repeat-y;` |
| `mask-repeat-space` | `mask-repeat: space;` |
| `mask-repeat-round` | `mask-repeat: round;` |

## Notes

- Basic example: `mask-repeat` repeats the mask image both vertically and horizontally.
- Repeating horizontally: `mask-repeat-x`. Repeating vertically: `mask-repeat-y`.
- Preventing clipping: `mask-repeat-space` repeats the mask image without clipping.
- Preventing clipping and gaps: `mask-repeat-round` repeats the mask image without clipping, stretching if needed to avoid gaps.
- Disabling repeating: `mask-no-repeat` prevents a mask image from repeating.

```html
<div class="mask-repeat-x mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)]..."></div>
<div class="mask-no-repeat mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>
```

### Responsive design

Prefix a `mask-repeat` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-repeat md:mask-repeat-x ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-repeat.mdx` (fetched 2026-10-16).

## Related

- [mask-size](./mask-size.md)
- [mask-position](./mask-position.md)
- [background-repeat](../backgrounds-borders/background-repeat.md)
