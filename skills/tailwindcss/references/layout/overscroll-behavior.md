---
source: https://tailwindcss.com/docs/overscroll-behavior
---

# overscroll-behavior

Utilities for controlling how the browser behaves when reaching the boundary of a scrolling area.

## Signature / Usage

```html
<div class="overscroll-contain ...">Well, let me tell you something, ...</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `overscroll-auto` | `overscroll-behavior: auto;` |
| `overscroll-contain` | `overscroll-behavior: contain;` |
| `overscroll-none` | `overscroll-behavior: none;` |
| `overscroll-x-auto` | `overscroll-behavior-x: auto;` |
| `overscroll-x-contain` | `overscroll-behavior-x: contain;` |
| `overscroll-x-none` | `overscroll-behavior-x: none;` |
| `overscroll-y-auto` | `overscroll-behavior-y: auto;` |
| `overscroll-y-contain` | `overscroll-behavior-y: contain;` |
| `overscroll-y-none` | `overscroll-behavior-y: none;` |

## Notes

- `overscroll-contain` prevents scrolling in the target area from triggering scrolling in the parent element, but preserves "bounce" effects where the operating system supports them.
- `overscroll-none` also prevents "bounce" effects when scrolling past the end of the container.
- `overscroll-auto` lets the user continue scrolling a parent scroll area when they reach the boundary of the primary scroll area.
- Responsive: `overscroll-auto md:overscroll-contain`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/overscroll-behavior.mdx` (fetched 2026-10-16).

## Related

- [overflow](./overflow.md)
