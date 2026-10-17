---
source: https://tailwindcss.com/docs/break-after
---

# break-after

Utilities for controlling how a column or page should break after an element.

## Signature / Usage

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-after-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `break-after-auto` | `break-after: auto;` |
| `break-after-avoid` | `break-after: avoid;` |
| `break-after-all` | `break-after: all;` |
| `break-after-avoid-page` | `break-after: avoid-page;` |
| `break-after-page` | `break-after: page;` |
| `break-after-left` | `break-after: left;` |
| `break-after-right` | `break-after: right;` |
| `break-after-column` | `break-after: column;` |

## Notes

- Use utilities like `break-after-column` and `break-after-page` to control how a column or page break should behave after an element.
- Responsive: `break-after-column md:break-after-auto`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/break-after.mdx` (fetched 2026-10-16).

## Related

- [break-before](./break-before.md)
- [break-inside](./break-inside.md)
- [columns](./columns.md)
