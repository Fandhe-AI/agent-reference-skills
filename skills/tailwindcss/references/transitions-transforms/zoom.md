---
source: https://tailwindcss.com/docs/zoom
---

# zoom

Utilities for scaling elements using zoom.

## Signature / Usage

```html
<div class="zoom-75 ...">
  <!-- ... -->
</div>
<div class="zoom-100 ...">
  <!-- ... -->
</div>
<div class="zoom-125 ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `zoom-<number>` | `zoom: <number>%;` |
| `zoom-(<custom-property>)` | `zoom: var(<custom-property>);` |
| `zoom-[<value>]` | `zoom: <value>;` |

## Notes

- Use `zoom-<number>` utilities like `zoom-75` and `zoom-125` to scale an element using the CSS `zoom` property.
- Custom value: use `zoom-[<value>]`; for CSS variables use `zoom-(<custom-property>)`, shorthand for `zoom-[var(<custom-property>)]`.

```html
<div class="zoom-[1.1] ...">
  <!-- ... -->
</div>
<div class="zoom-(--my-zoom) ...">
  <!-- ... -->
</div>
```

- Applying on hover: prefix with a variant like `hover:*`:

```html
<div class="zoom-100 hover:zoom-125 ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<div class="zoom-100 md:zoom-125 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/zoom.mdx` (fetched 2026-10-16).

## Related

- [scale](./scale.md)
