---
source: https://tailwindcss.com/docs/place-items
---

# place-items

Utilities for controlling how items are justified and aligned at the same time.

## Signature / Usage

```html
<div class="grid grid-cols-3 place-items-start gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `place-items-start` | `place-items: start;` |
| `place-items-end` | `place-items: end;` |
| `place-items-end-safe` | `place-items: safe end;` |
| `place-items-center` | `place-items: center;` |
| `place-items-center-safe` | `place-items: safe center;` |
| `place-items-baseline` | `place-items: baseline;` |
| `place-items-stretch` | `place-items: stretch;` |

## Notes

- Start: `place-items-start` places grid items on the start of their grid areas on both axes.
- End: `place-items-end` places grid items on the end of their grid areas on both axes.
- Center: `place-items-center` places grid items on the center of their grid areas on both axes.
- Stretch: `place-items-stretch` stretches items along their grid areas on both axes.

```html
<div class="grid h-56 grid-cols-3 place-items-stretch gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

- Responsive design: prefix a `place-items` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid place-items-start md:place-items-center ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/place-items.mdx` (fetched 2026-10-16).

## Related

- [justify-items](./justify-items.md)
- [align-items](./align-items.md)
- [place-self](./place-self.md)
