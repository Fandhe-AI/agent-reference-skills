---
source: https://tailwindcss.com/docs/align-content
---

# align-content

Utilities for controlling how rows are positioned in multi-row flex and grid containers.

## Signature / Usage

```html
<div class="grid h-56 grid-cols-3 content-start gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `content-normal` | `align-content: normal;` |
| `content-center` | `align-content: center;` |
| `content-start` | `align-content: flex-start;` |
| `content-end` | `align-content: flex-end;` |
| `content-between` | `align-content: space-between;` |
| `content-around` | `align-content: space-around;` |
| `content-evenly` | `align-content: space-evenly;` |
| `content-baseline` | `align-content: baseline;` |
| `content-stretch` | `align-content: stretch;` |

## Notes

- Start: `content-start` packs rows in a container against the start of the cross axis.
- Center: `content-center` packs rows in the center of the cross axis.
- End: `content-end` packs rows against the end of the cross axis.
- Space between: `content-between` distributes rows such that there is an equal amount of space between each line.
- Space around: `content-around` distributes rows such that there is an equal amount of space around each line.
- Space evenly: `content-evenly` distributes rows such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using `content-around`.
- Stretch: `content-stretch` allows content items to fill the available space along the container's cross axis.
- Normal: `content-normal` packs content items in their default position as if no `align-content` value was set.

```html
<div class="grid h-56 grid-cols-3 content-normal gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

- Responsive design: prefix an `align-content` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid content-start md:content-around ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/align-content.mdx` (fetched 2026-10-16).

## Related

- [justify-content](./justify-content.md)
- [align-items](./align-items.md)
- [place-content](./place-content.md)
