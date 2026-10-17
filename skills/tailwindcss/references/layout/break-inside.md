---
source: https://tailwindcss.com/docs/break-inside
---

# break-inside

Utilities for controlling how a column or page should break within an element.

## Signature / Usage

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `break-inside-auto` | `break-inside: auto;` |
| `break-inside-avoid` | `break-inside: avoid;` |
| `break-inside-avoid-page` | `break-inside: avoid-page;` |
| `break-inside-avoid-column` | `break-inside: avoid-column;` |

## Notes

- Use utilities like `break-inside-avoid-column` and `break-inside-avoid-page` to control how a column or page break should behave within an element. (The source prose also names `break-inside-column`, which is not in the class table above.)
- Responsive: `break-inside-avoid-column md:break-inside-auto`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/break-inside.mdx` (fetched 2026-10-16).

## Related

- [break-after](./break-after.md)
- [break-before](./break-before.md)
- [columns](./columns.md)
