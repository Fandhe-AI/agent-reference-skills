---
source: https://tailwindcss.com/docs/mask-mode
---

# mask-mode

Utilities for controlling an element's mask mode.

## Signature / Usage

```html
<div class="mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-luminance mask-r-from-white mask-r-from-50% mask-r-to-black bg-[url(/img/mountains.jpg)] ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-alpha` | `mask-mode: alpha;` |
| `mask-luminance` | `mask-mode: luminance;` |
| `mask-match` | `mask-mode: match-source;` |

## Notes

- Basic example: use the `mask-alpha`, `mask-luminance` and `mask-match` utilities to control the mode of an element's mask.
- When using `mask-luminance` the luminance value of the mask determines visibility, so sticking with grayscale colors will produce the most predictable results. With `mask-alpha`, the opacity of the mask determines the visibility of the masked element.
- For SVG `<mask>` elements see `mask-type.md` (`mask-type-alpha` / `mask-type-luminance`).

### Responsive design

Prefix a `mask-mode` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="mask-alpha md:mask-luminance ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-mode.mdx` (fetched 2026-10-16).

## Related

- [mask-type](./mask-type.md)
- [mask-image](./mask-image.md)
