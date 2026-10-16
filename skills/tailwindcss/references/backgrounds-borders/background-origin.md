---
source: https://tailwindcss.com/docs/background-origin
---

# background-origin

Utilities for controlling how an element's background is positioned relative to borders, padding, and content.

## Signature / Usage

```html
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-border p-3 ..."></div>
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-padding p-3 ..."></div>
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-content p-3 ..."></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-origin-border` | `background-origin: border-box;` |
| `bg-origin-padding` | `background-origin: padding-box;` |
| `bg-origin-content` | `background-origin: content-box;` |

## Notes

- Responsive: prefix with a breakpoint variant like `md:` (`bg-origin-border md:bg-origin-padding`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-origin.mdx` (fetched 2026-10-16).

```html
<div class="bg-origin-border md:bg-origin-padding ...">
  <!-- ... -->
</div>
```

## Related

- [background-clip](./background-clip.md)
- [background-position](./background-position.md)
