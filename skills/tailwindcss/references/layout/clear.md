---
source: https://tailwindcss.com/docs/clear
---

# clear

Utilities for controlling the wrapping of content around an element.

## Signature / Usage

```html
<article>
  <img class="float-left ..." src="/img/snow-mountains.jpg" />
  <img class="float-right ..." src="/img/green-mountains.jpg" />
  <p class="clear-left ...">Maybe we can live without libraries...</p>
</article>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `clear-left` | `clear: left;` |
| `clear-right` | `clear: right;` |
| `clear-both` | `clear: both;` |
| `clear-start` | `clear: inline-start;` |
| `clear-end` | `clear: inline-end;` |
| `clear-none` | `clear: none;` |

## Notes

- `clear-left` positions an element below any preceding left-floated elements; `clear-right` below right-floated ones; `clear-both` below all preceding floated elements.
- `clear-start` and `clear-end` use logical properties to map to the left or right side based on text direction (e.g. `<article dir="rtl">`).
- `clear-none` resets any clears applied to an element.
- Responsive: `clear-left md:clear-none`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/clear.mdx` (fetched 2026-10-16).

## Related

- [float](./float.md)
