---
source: https://tailwindcss.com/docs/align-items
---

# align-items

Utilities for controlling how flex and grid items are positioned along a container's cross axis.

## Signature / Usage

```html
<div class="flex items-stretch ...">
  <div class="py-4">01</div>
  <div class="py-12">02</div>
  <div class="py-8">03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `items-start` | `align-items: flex-start;` |
| `items-end` | `align-items: flex-end;` |
| `items-end-safe` | `align-items: safe flex-end;` |
| `items-center` | `align-items: center;` |
| `items-center-safe` | `align-items: safe center;` |
| `items-baseline` | `align-items: baseline;` |
| `items-baseline-last` | `align-items: last baseline;` |
| `items-stretch` | `align-items: stretch;` |

## Notes

- Stretch: `items-stretch` stretches items to fill the container's cross axis.
- Start: `items-start` aligns items to the start of the container's cross axis.
- Center: `items-center` aligns items along the center of the container's cross axis.
- End: `items-end` aligns items to the end of the container's cross axis.
- Baseline: `items-baseline` aligns items along the container's cross axis such that all of their baselines align.
- Last baseline: `items-baseline-last` aligns items such that all of their baselines align with the last baseline in the container. This is useful for ensuring that text items align with each other, even if they have different heights.

```html
<div class="grid grid-cols-[1fr_auto] items-baseline-last">
  <div>
    <img src="img/spencer-sharp.jpg" />
    <h4>Spencer Sharp</h4>
    <p>Working on the future of astronaut recruitment at Space Recruit.</p>
  </div>
  <p>spacerecruit.com</p>
</div>
```

- Responsive design: prefix an `align-items` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="flex items-stretch md:items-center ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/align-items.mdx` (fetched 2026-10-16).

## Related

- [align-self](./align-self.md)
- [align-content](./align-content.md)
- [justify-items](./justify-items.md)
- [place-items](./place-items.md)
