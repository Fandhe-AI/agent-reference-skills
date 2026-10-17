---
source: https://tailwindcss.com/docs/perspective-origin
---

# perspective-origin

Utilities for controlling an element's perspective origin when placed in 3D space.

## Signature / Usage

```html
<div class="size-20 perspective-near perspective-origin-top-left ...">
  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>
  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `perspective-origin-center` | `perspective-origin: center;` |
| `perspective-origin-top` | `perspective-origin: top;` |
| `perspective-origin-top-right` | `perspective-origin: top right;` |
| `perspective-origin-right` | `perspective-origin: right;` |
| `perspective-origin-bottom-right` | `perspective-origin: bottom right;` |
| `perspective-origin-bottom` | `perspective-origin: bottom;` |
| `perspective-origin-bottom-left` | `perspective-origin: bottom left;` |
| `perspective-origin-left` | `perspective-origin: left;` |
| `perspective-origin-top-left` | `perspective-origin: top left;` |
| `perspective-origin-(<custom-property>)` | `perspective-origin: var(<custom-property>);` |
| `perspective-origin-[<value>]` | `perspective-origin: <value>;` |

## Notes

- Use utilities like `perspective-origin-top` and `perspective-origin-bottom-left` to control where the vanishing point of a perspective is located.
- Custom value: use `perspective-origin-[<value>]`; for CSS variables use `perspective-origin-(<custom-property>)`, shorthand for `perspective-origin-[var(<custom-property>)]`.

```html
<div class="perspective-origin-[200%_150%] ...">
  <!-- ... -->
</div>
<div class="perspective-origin-(--my-perspective-origin) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<div class="perspective-origin-center md:perspective-origin-bottom-left ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/perspective-origin.mdx` (fetched 2026-10-16).

## Related

- [perspective](./perspective.md)
- [transform-origin](./transform-origin.md)
