---
source: https://tailwindcss.com/docs/object-fit
---

# object-fit

Utilities for controlling how a replaced element's content should be resized.

## Signature / Usage

```html
<img class="h-48 w-96 object-cover ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `object-contain` | `object-fit: contain;` |
| `object-cover` | `object-fit: cover;` |
| `object-fill` | `object-fit: fill;` |
| `object-none` | `object-fit: none;` |
| `object-scale-down` | `object-fit: scale-down;` |

## Notes

- `object-cover` resizes content to cover its container; `object-contain` keeps it contained within its container; `object-fill` stretches it to fit.
- `object-scale-down` displays content at its original size but scales it down to fit its container if necessary.
- `object-none` displays content at its original size, ignoring the container size.
- Responsive: `<img class="object-contain md:object-cover" src="/img/mountains.jpg" />`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/object-fit.mdx` (fetched 2026-10-16).

## Related

- [object-position](./object-position.md)
- [aspect-ratio](./aspect-ratio.md)
