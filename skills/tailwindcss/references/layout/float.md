---
source: https://tailwindcss.com/docs/float
---

# float

Utilities for controlling the wrapping of content around an element.

## Signature / Usage

```html
<article>
  <img class="float-right ..." src="/img/mountains.jpg" />
  <p>Maybe we can live without libraries, people like you and me. ...</p>
</article>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `float-right` | `float: right;` |
| `float-left` | `float: left;` |
| `float-start` | `float: inline-start;` |
| `float-end` | `float: inline-end;` |
| `float-none` | `float: none;` |

## Notes

- `float-right` / `float-left` float an element to the right / left of its container.
- `float-start` and `float-end` use logical properties to map to the left or right side based on text direction (e.g. with `dir="rtl"`).
- `float-none` resets any floats applied to an element.
- Responsive: `<img class="float-right md:float-left" src="/img/mountains.jpg" />`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/float.mdx` (fetched 2026-10-16).

## Related

- [clear](./clear.md)
