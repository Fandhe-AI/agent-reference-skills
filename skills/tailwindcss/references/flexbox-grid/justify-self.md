---
source: https://tailwindcss.com/docs/justify-self
---

# justify-self

Utilities for controlling how an individual grid item is aligned along its inline axis.

## Signature / Usage

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-start ...">02</div>
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `justify-self-auto` | `justify-self: auto;` |
| `justify-self-start` | `justify-self: start;` |
| `justify-self-center` | `justify-self: center;` |
| `justify-self-center-safe` | `justify-self: safe center;` |
| `justify-self-end` | `justify-self: end;` |
| `justify-self-end-safe` | `justify-self: safe end;` |
| `justify-self-stretch` | `justify-self: stretch;` |

## Notes

- Auto: `justify-self-auto` aligns an item based on the value of the grid's `justify-items` property.
- Start: `justify-self-start` aligns a grid item to the start of its inline axis.
- Center: `justify-self-center` or `justify-self-center-safe` align a grid item along the center of its inline axis. When there is not enough space available, `justify-self-center-safe` aligns the item to the start of the container.
- End: `justify-self-end` or `justify-self-end-safe` align a grid item to the end of its inline axis. When there is not enough space available, `justify-self-end-safe` aligns the item to the start of the container instead of the end.
- Stretch: `justify-self-stretch` stretches a grid item to fill the grid area on its inline axis.

```html
<div class="grid justify-items-start ...">
  <!-- ... -->
  <div class="justify-self-stretch ...">02</div>
  <!-- ... -->
</div>
```

- Responsive design: prefix a `justify-self` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="justify-self-start md:justify-self-end ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/justify-self.mdx` (fetched 2026-10-16).

## Related

- [justify-items](./justify-items.md)
- [align-self](./align-self.md)
- [place-self](./place-self.md)
