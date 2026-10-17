---
source: https://tailwindcss.com/docs/place-content
---

# place-content

Utilities for controlling how content is justified and aligned at the same time.

## Signature / Usage

```html
<div class="grid h-48 grid-cols-2 place-content-center gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `place-content-center` | `place-content: center;` |
| `place-content-center-safe` | `place-content: safe center;` |
| `place-content-start` | `place-content: start;` |
| `place-content-end` | `place-content: end;` |
| `place-content-end-safe` | `place-content: safe end;` |
| `place-content-between` | `place-content: space-between;` |
| `place-content-around` | `place-content: space-around;` |
| `place-content-evenly` | `place-content: space-evenly;` |
| `place-content-baseline` | `place-content: baseline;` |
| `place-content-stretch` | `place-content: stretch;` |

## Notes

- Center: `place-content-center` packs items in the center of the inline and block axes.
- Start: `place-content-start` packs items against the start of the inline and block axes.
- End: `place-content-end` packs items against the end of the inline and block axes.
- Space between: `place-content-between` distributes grid items along the inline and block axes so that there is an equal amount of space between each row and column on each axis respectively.
- Space around: `place-content-around` distributes grid items so that there is an equal amount of space around each row and column on each axis respectively.
- Space evenly: `place-content-evenly` distributes grid items such that they are evenly spaced on the inline and block axes.
- Stretch: `place-content-stretch` stretches grid items along their grid areas on the inline and block axes.

```html
<div class="grid h-48 grid-cols-2 place-content-stretch gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

- Responsive design: prefix a `place-content` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid place-content-start md:place-content-center ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/place-content.mdx` (fetched 2026-10-16).

## Related

- [justify-content](./justify-content.md)
- [align-content](./align-content.md)
- [place-items](./place-items.md)
