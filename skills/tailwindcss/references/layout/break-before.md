---
source: https://tailwindcss.com/docs/break-before
---

# break-before

Utilities for controlling how a column or page should break before an element.

## Signature / Usage

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-before-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `break-before-auto` | `break-before: auto;` |
| `break-before-avoid` | `break-before: avoid;` |
| `break-before-all` | `break-before: all;` |
| `break-before-avoid-page` | `break-before: avoid-page;` |
| `break-before-page` | `break-before: page;` |
| `break-before-left` | `break-before: left;` |
| `break-before-right` | `break-before: right;` |
| `break-before-column` | `break-before: column;` |

## Notes

- Use utilities like `break-before-column` and `break-before-page` to control how a column or page break should behave before an element.
- Responsive: `break-before-column md:break-before-auto`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/break-before.mdx` (fetched 2026-10-16).

## Related

- [break-after](./break-after.md)
- [break-inside](./break-inside.md)
- [columns](./columns.md)
