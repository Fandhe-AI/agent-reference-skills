---
source: https://tailwindcss.com/docs/justify-content
---

# justify-content

Utilities for controlling how flex and grid items are positioned along a container's main axis.

## Signature / Usage

```html
<div class="flex justify-start ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `justify-start` | `justify-content: flex-start;` |
| `justify-end` | `justify-content: flex-end;` |
| `justify-end-safe` | `justify-content: safe flex-end;` |
| `justify-center` | `justify-content: center;` |
| `justify-center-safe` | `justify-content: safe center;` |
| `justify-between` | `justify-content: space-between;` |
| `justify-around` | `justify-content: space-around;` |
| `justify-evenly` | `justify-content: space-evenly;` |
| `justify-stretch` | `justify-content: stretch;` |
| `justify-baseline` | `justify-content: baseline;` |
| `justify-normal` | `justify-content: normal;` |

## Notes

- Start: `justify-start` justifies items against the start of the container's main axis.
- Center: `justify-center` or `justify-center-safe` justify items along the center of the container's main axis. When there is not enough space available, `justify-center-safe` aligns items to the start of the container instead of the center.

```html
<div class="flex justify-center-safe ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

- End: `justify-end` or `justify-end-safe` justify items against the end of the container's main axis. When there is not enough space available, `justify-end-safe` aligns items to the start of the container instead of the end.
- Space between: `justify-between` justifies items such that there is an equal amount of space between each item.
- Space around: `justify-around` justifies items such that there is an equal amount of space on each side of each item.
- Space evenly: `justify-evenly` justifies items such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using `justify-around`.
- Stretch: `justify-stretch` allows auto-sized content items to fill the available space along the container's main axis.

```html
<div class="grid grid-cols-[4rem_auto_4rem] justify-stretch ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

- Normal: `justify-normal` packs content items in their default position as if no `justify-content` value was set.
- Responsive design: prefix a `justify-content` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="flex justify-start md:justify-between ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/justify-content.mdx` (fetched 2026-10-16).

## Related

- [justify-items](./justify-items.md)
- [align-content](./align-content.md)
- [place-content](./place-content.md)
