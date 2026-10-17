---
source: https://tailwindcss.com/docs/box-sizing
---

# box-sizing

Utilities for controlling how the browser should calculate an element's total size.

## Signature / Usage

```html
<div class="box-border size-32 border-4 p-4 ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `box-border` | `box-sizing: border-box;` |
| `box-content` | `box-sizing: content-box;` |

## Notes

- `box-border` sets `box-sizing: border-box`, telling the browser to include the element's borders and padding when you give it a height or width. A 100px x 100px element with a 2px border and 4px of padding on all sides renders as 100px x 100px, with an internal content area of 88px x 88px.
- Tailwind makes `border-box` the default for all elements in its Preflight base styles.
- `box-content` sets `box-sizing: content-box`, adding borders and padding on top of the specified width or height. The same element then renders as 112px x 112px, with an internal content area of 100px x 100px:

```html
<div class="box-content size-32 border-4 p-4 ...">
  <!-- ... -->
</div>
```

- Responsive: `box-content md:box-border`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/box-sizing.mdx` (fetched 2026-10-16).

## Related

- [display](./display.md)
