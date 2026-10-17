---
source: https://tailwindcss.com/docs/backface-visibility
---

# backface-visibility

Utilities for controlling if an element's backface is visible.

## Signature / Usage

```html
<div class="size-20 ...">
  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 backface-hidden ...">1</div>
  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 backface-hidden ...">2</div>
  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 backface-hidden ...">3</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backface-hidden` | `backface-visibility: hidden;` |
| `backface-visible` | `backface-visibility: visible;` |

## Notes

- Use `backface-visible` to show the backface of an element, like a cube, even when it is rotated away from view.
- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<div class="backface-visible md:backface-hidden ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backface-visibility.mdx` (fetched 2026-10-16).

## Related

- [transform-style](./transform-style.md)
- [perspective](./perspective.md)
- [rotate](./rotate.md)
