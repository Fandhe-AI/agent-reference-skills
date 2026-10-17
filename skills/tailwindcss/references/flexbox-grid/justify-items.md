---
source: https://tailwindcss.com/docs/justify-items
---

# justify-items

Utilities for controlling how grid items are aligned along their inline axis.

## Signature / Usage

```html
<div class="grid justify-items-start ...">
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
| `justify-items-start` | `justify-items: start;` |
| `justify-items-end` | `justify-items: end;` |
| `justify-items-end-safe` | `justify-items: safe end;` |
| `justify-items-center` | `justify-items: center;` |
| `justify-items-center-safe` | `justify-items: safe center;` |
| `justify-items-stretch` | `justify-items: stretch;` |
| `justify-items-normal` | `justify-items: normal;` |

## Notes

- Start: `justify-items-start` justifies grid items against the start of their inline axis.
- End: `justify-items-end` or `justify-items-end-safe` justify grid items against the end of their inline axis. When there is not enough space available, `justify-items-end-safe` aligns items to the start of the container instead of the end.

```html
<div class="grid grid-flow-col justify-items-end-safe ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

- Center: `justify-items-center` or `justify-items-center-safe` center grid items along their inline axis. When there is not enough space available, `justify-items-center-safe` aligns items to the start of the container instead of the center.
- Stretch: `justify-items-stretch` stretches items along their inline axis.
- Responsive design: prefix a `justify-items` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid justify-items-start md:justify-items-center ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/justify-items.mdx` (fetched 2026-10-16).

## Related

- [justify-self](./justify-self.md)
- [justify-content](./justify-content.md)
- [place-items](./place-items.md)
