---
source: https://tailwindcss.com/docs/mask-origin
---

# mask-origin

Utilities for controlling how an element's mask image is positioned relative to borders, padding, and content.

## Signature / Usage

```html
<div class="mask-origin-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-origin-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-origin-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-origin-border` | `mask-origin: border-box;` |
| `mask-origin-padding` | `mask-origin: padding-box;` |
| `mask-origin-content` | `mask-origin: content-box;` |
| `mask-origin-fill` | `mask-origin: fill-box;` |
| `mask-origin-stroke` | `mask-origin: stroke-box;` |
| `mask-origin-view` | `mask-origin: view-box;` |

## Notes

- Basic example: use utilities like `mask-origin-border`, `mask-origin-padding`, and `mask-origin-content` to control where an element's mask is rendered.

### Responsive design

Prefix a `mask-origin` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-origin-border md:mask-origin-padding ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-origin.mdx` (fetched 2026-10-16).

## Related

- [mask-clip](./mask-clip.md)
- [mask-position](./mask-position.md)
- [background-origin](../backgrounds-borders/background-origin.md)
