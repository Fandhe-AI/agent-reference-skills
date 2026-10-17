---
source: https://tailwindcss.com/docs/align-self
---

# align-self

Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.

## Signature / Usage

```html
<div class="flex items-stretch ...">
  <div>01</div>
  <div class="self-auto ...">02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `self-auto` | `align-self: auto;` |
| `self-start` | `align-self: flex-start;` |
| `self-end` | `align-self: flex-end;` |
| `self-end-safe` | `align-self: safe flex-end;` |
| `self-center` | `align-self: center;` |
| `self-center-safe` | `align-self: safe center;` |
| `self-stretch` | `align-self: stretch;` |
| `self-baseline` | `align-self: baseline;` |
| `self-baseline-last` | `align-self: last baseline;` |

## Notes

- Auto: `self-auto` aligns an item based on the value of the container's `align-items` property.
- Start: `self-start` aligns an item to the start of the container's cross axis, despite the container's `align-items` value.
- Center: `self-center` aligns an item along the center of the container's cross axis, despite the container's `align-items` value.
- End: `self-end` aligns an item to the end of the container's cross axis, despite the container's `align-items` value.
- Stretch: `self-stretch` stretches an item to fill the container's cross axis, despite the container's `align-items` value.
- Baseline: `self-baseline` aligns an item such that its baseline aligns with the baseline of the flex container's cross axis.
- Last baseline: `self-baseline-last` aligns an item along the container's cross axis such that its baseline aligns with the last baseline in the container. This is useful for ensuring that text items align with each other, even if they have different heights.

```html
<div class="grid grid-cols-[1fr_auto]">
  <div>
    <img src="img/spencer-sharp.jpg" />
    <h4>Spencer Sharp</h4>
    <p class="self-baseline-last">Working on the future of astronaut recruitment at Space Recruit.</p>
  </div>
  <p class="self-baseline-last">spacerecruit.com</p>
</div>
```

- Responsive design: prefix an `align-self` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="self-auto md:self-end ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/align-self.mdx` (fetched 2026-10-16).

## Related

- [align-items](./align-items.md)
- [justify-self](./justify-self.md)
- [place-self](./place-self.md)
