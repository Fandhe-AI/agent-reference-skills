---
source: https://tailwindcss.com/docs/position
---

# position

Utilities for controlling how an element is positioned in the document.

## Signature / Usage

```html
<div class="relative ...">
  <p>Relative parent</p>
  <div class="absolute bottom-0 left-0 ...">
    <p>Absolute child</p>
  </div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `static` | `position: static;` |
| `fixed` | `position: fixed;` |
| `absolute` | `position: absolute;` |
| `relative` | `position: relative;` |
| `sticky` | `position: sticky;` |

## Notes

- `static`: normal flow; any offsets are ignored and the element does not act as a position reference for absolutely positioned children.
- `relative`: offsets are calculated relative to the element's normal position and the element acts as a position reference for absolutely positioned children.
- `absolute`: positions the element outside the normal flow, so neighboring elements act as if it does not exist; offsets are calculated relative to the nearest parent with a position other than `static`, and the element acts as a position reference for other absolutely positioned children.
- `fixed`: positions the element relative to the browser window; offsets are calculated relative to the viewport and the element acts as a position reference for absolutely positioned children.
- `sticky`: positions the element as `relative` until it crosses a specified threshold, then treats it as `fixed` until its parent is off screen; offsets are calculated relative to the element's normal position. Example: `<div class="sticky top-0 ...">A</div>`.
- Offsets are set with the top / right / bottom / left utilities.
- Responsive: `relative md:absolute`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/position.mdx` (fetched 2026-10-16).

## Related

- [top-right-bottom-left](./top-right-bottom-left.md)
- [z-index](./z-index.md)
