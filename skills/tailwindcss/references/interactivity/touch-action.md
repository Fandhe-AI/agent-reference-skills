---
source: https://tailwindcss.com/docs/touch-action
---

# touch-action

Utilities for controlling how an element can be scrolled and zoomed on touchscreens.

## Signature / Usage

```html
<div class="h-48 w-full touch-auto overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
<div class="h-48 w-full touch-none overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
<div class="h-48 w-full touch-pan-x overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
<div class="h-48 w-full touch-pan-y overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `touch-auto` | `touch-action: auto;` |
| `touch-none` | `touch-action: none;` |
| `touch-pan-x` | `touch-action: pan-x;` |
| `touch-pan-left` | `touch-action: pan-left;` |
| `touch-pan-right` | `touch-action: pan-right;` |
| `touch-pan-y` | `touch-action: pan-y;` |
| `touch-pan-up` | `touch-action: pan-up;` |
| `touch-pan-down` | `touch-action: pan-down;` |
| `touch-pinch-zoom` | `touch-action: pinch-zoom;` |
| `touch-manipulation` | `touch-action: manipulation;` |

## Notes

- Basic example: use utilities like `touch-pan-y` and `touch-pinch-zoom` to control how an element can be scrolled (panned) and zoomed (pinched) on touchscreens.
- Responsive design: prefix a `touch-action` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="touch-pan-x md:touch-auto ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/touch-action.mdx` (fetched 2026-10-16).

## Related

- [pointer-events](./pointer-events.md)
- [user-select](./user-select.md)
