---
source: https://tailwindcss.com/docs/place-self
---

# place-self

Utilities for controlling how an individual item is justified and aligned at the same time.

## Signature / Usage

```html
<div class="grid grid-cols-3 gap-4 ...">
  <div>01</div>
  <div class="place-self-start ...">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `place-self-auto` | `place-self: auto;` |
| `place-self-start` | `place-self: start;` |
| `place-self-end` | `place-self: end;` |
| `place-self-end-safe` | `place-self: safe end;` |
| `place-self-center` | `place-self: center;` |
| `place-self-center-safe` | `place-self: safe center;` |
| `place-self-stretch` | `place-self: stretch;` |

## Notes

- Auto: `place-self-auto` aligns an item based on the value of the container's `place-items` property.
- Start: `place-self-start` aligns an item to the start on both axes.
- Center: `place-self-center` aligns an item at the center on both axes.
- End: `place-self-end` aligns an item to the end on both axes.
- Stretch: `place-self-stretch` stretches an item on both axes.

```html
<div class="grid grid-cols-3 gap-4 ...">
  <div>01</div>
  <div class="place-self-stretch ...">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

- Responsive design: prefix a `place-self` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="place-self-start md:place-self-end ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/place-self.mdx` (fetched 2026-10-16).

## Related

- [justify-self](./justify-self.md)
- [align-self](./align-self.md)
- [place-items](./place-items.md)
