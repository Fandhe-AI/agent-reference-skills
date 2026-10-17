---
source: https://tailwindcss.com/docs/color-scheme
---

# color-scheme

Utilities for controlling the color scheme of an element.

## Signature / Usage

```html
<div class="scheme-light ...">
  <input type="date" />
</div>

<div class="scheme-dark ...">
  <input type="date" />
</div>

<div class="scheme-light-dark ...">
  <input type="date" />
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scheme-normal` | `color-scheme: normal;` |
| `scheme-dark` | `color-scheme: dark;` |
| `scheme-light` | `color-scheme: light;` |
| `scheme-light-dark` | `color-scheme: light dark;` |
| `scheme-only-dark` | `color-scheme: only dark;` |
| `scheme-only-light` | `color-scheme: only light;` |

## Notes

- Basic example: use utilities like `scheme-light` and `scheme-light-dark` to control how an element should be rendered.
- Applying in dark mode: prefix a `color-scheme` utility with a variant like `dark:*` to only apply the utility in that state:

```html
<html class="scheme-light dark:scheme-dark ...">
  <!-- ... -->
</html>
```

- Dark mode strategy (media query vs. manual toggle) is covered by the dark-mode page in this skill's core-concepts category.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/color-scheme.mdx` (fetched 2026-10-16).

## Related

- [accent-color](./accent-color.md)
- [appearance](./appearance.md)
- [dark-mode](../core-concepts/dark-mode.md)
