---
source: https://tailwindcss.com/docs/flex-direction
---

# flex-direction

Utilities for controlling the direction of flex items.

## Signature / Usage

```html
<div class="flex flex-row ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `flex-row` | `flex-direction: row;` |
| `flex-row-reverse` | `flex-direction: row-reverse;` |
| `flex-col` | `flex-direction: column;` |
| `flex-col-reverse` | `flex-direction: column-reverse;` |

## Notes

- Row: `flex-row` positions flex items horizontally in the same direction as text.
- Row reversed: `flex-row-reverse` positions flex items horizontally in the opposite direction.
- Column: `flex-col` positions flex items vertically.
- Column reversed: `flex-col-reverse` positions flex items vertically in the opposite direction.

```html
<div class="flex flex-col-reverse ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

- Responsive design: prefix a `flex-direction` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="flex flex-col md:flex-row ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/flex-direction.mdx` (fetched 2026-10-16).

## Related

- [flex-wrap](./flex-wrap.md)
- [order](./order.md)
