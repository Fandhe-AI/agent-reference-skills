---
source: https://tailwindcss.com/docs/mask-composite
---

# mask-composite

Utilities for controlling how multiple masks are combined together.

## Signature / Usage

```html
<div class="mask-add mask-[url(/img/circle.png),url(/img/circle.png)] mask-position-[30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
<div class="mask-subtract mask-[url(/img/circle.png),url(/img/circle.png)] mask-position-[30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
<div class="mask-intersect mask-[url(/img/circle.png),url(/img/circle.png)] mask-position-[30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
<div class="mask-exclude mask-[url(/img/circle.png),url(/img/circle.png)] mask-position-[30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-add` | `mask-composite: add;` |
| `mask-subtract` | `mask-composite: subtract;` |
| `mask-intersect` | `mask-composite: intersect;` |
| `mask-exclude` | `mask-composite: exclude;` |

## Notes

- Basic example: use utilities like `mask-add` and `mask-intersect` to control how an element's masks are combined together.
- The gradient mask utilities on `mask-image.md` rely on Tailwind setting `mask-composite` to `intersect` by default; changing this property affects how those gradient masks are combined.

### Responsive design

Prefix a `mask-composite` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-add md:mask-subtract ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-composite.mdx` (fetched 2026-10-16).

## Related

- [mask-image](./mask-image.md)
- [mask-position](./mask-position.md)
