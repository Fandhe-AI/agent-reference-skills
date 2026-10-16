---
source: https://tailwindcss.com/docs/mask-type
---

# mask-type

Utilities for controlling how an SVG mask is interpreted.

## Signature / Usage

```html
<svg>
  <mask id="blob1" class="mask-type-alpha fill-gray-700/70">
    <path d="..."></path>
  </mask>
  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob1)" />
</svg>

<svg>
  <mask id="blob2" class="mask-type-luminance fill-gray-700/70">
    <path d="..."></path>
  </mask>
  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob2)" />
</svg>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `mask-type-alpha` | `mask-type: alpha;` |
| `mask-type-luminance` | `mask-type: luminance;` |

## Notes

- Basic example: use the `mask-type-alpha` and `mask-type-luminance` utilities to control the type of an SVG mask.
- When using `mask-type-luminance` the luminance value of the SVG mask determines visibility, so sticking with grayscale colors will produce the most predictable results. With `mask-alpha`, the opacity of the SVG mask determines the visibility of the masked element (wording as published).
- For CSS masks on HTML elements see `mask-mode.md`.

### Responsive design

Prefix a `mask-type` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<mask class="mask-type-alpha md:mask-type-luminance ...">
  <!-- ... -->
</mask>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/mask-type.mdx` (fetched 2026-10-16).

## Related

- [mask-mode](./mask-mode.md)
- [mask-image](./mask-image.md)
