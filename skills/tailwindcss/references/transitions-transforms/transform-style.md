---
source: https://tailwindcss.com/docs/transform-style
---

# transform-style

Utilities for controlling if an element's children are placed in 3D space.

## Signature / Usage

```html
<div class="size-20 transform-3d ...">
  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>
  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `transform-3d` | `transform-style: preserve-3d;` |
| `transform-flat` | `transform-style: flat;` |

## Notes

- Use `transform-3d` to position children in 3D space. Without it, any children are only transformed in 2D space and not in 3D space.
- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<div class="transform-3d md:transform-flat ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transform-style.mdx` (fetched 2026-10-16).

## Related

- [perspective](./perspective.md)
- [backface-visibility](./backface-visibility.md)
- [translate](./translate.md)
